import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

export default function Lights(props) {
  const [lightSwitch, setLightSwitch] = useState(false); // To refetch the API when the lights are toggled
  const [lights, setLights] = useState([]);
  const [lightNumber, setLightNumber] = useState(0); // Set this value to whatever light the colorpicker is for at that time
  const [picker, setPicker] = useState(false); // Whether or not to display the Color Picker
  const [rgb, setRgb] = useState({"r": 255, "g": 255, "b": 255});

  useEffect(() => { // Will get all lights on page load as long as there is a URL given
    if (props.url !== "default") {
      Axios.get(props.url + '/lights').then(res => {
        let hueLights = Object.entries(res.data)
        setLights(hueLights)
      })
    }
  }, [props.url, lightSwitch])

  let toggleLight = (lightNum, on) => { // Turns a specific light on/off based on its ID
    Axios.put(props.url + `/lights/${lightNum}/state`, {'on': on})
      setLightSwitch(!lightSwitch)
  }

  let colorToggle = (lightNum) => { // Show the color picker for the corresponding light
    let rgbColor; // Needs to return {r: 255, g: 255, b: 255} for react-color
    Axios.get(props.url + `/lights/${lightNum}`).then(res => {
      rgbColor = xyToRGB(res.data.state.xy[0], res.data.state.xy[1], res.data.state.bri)
      setRgb(rgbColor)
    })
    setLightNumber(lightNum)
    setPicker(true)

    document.querySelector('#color-picker').classList.add('show');
    document.querySelector('#color-picker').classList.remove('no-show');
    document.querySelector('#cover-div').classList.add('opaque-div');
    document.querySelector('#cover-div').classList.remove('no-show');
    document.addEventListener('click', () => {
      document.querySelector('#color-picker').classList.remove('show');
      document.querySelector('#color-picker').classList.add('no-show');
      document.querySelector('#cover-div').classList.add('no-show');
      document.querySelector('#cover-div').classList.remove('opaque-div');
    }, {once: true})
  }

  let updateColor = (color) => { // For the onChangeComplete of the ColorPicker
    let xyColor = rgbToXY(color.r, color.g, color.b) // Needs to return [0.2345, 0.9876] for the Hue API
    xyColor.x = parseFloat(xyColor.x)
    xyColor.y = parseFloat(xyColor.y)
    Axios.put(props.url + `/lights/${lightNumber}/state`, {"xy": [xyColor.x, xyColor.y]})
  }

  let content;
  if (lights.length > 0) { // Show connected lights or no connected lights message
    content = lights.map((light, id) =>
      <div className="col s6 offset-s3 m6" key={id}>
        <h2 className="header">{light[1].name}</h2>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <p><span className="blue-text text-darken-3">{light[1].name}</span> is currently {light[1].state.on ? <span className="green-text text-darken-3">On</span> : <span className="red-text">Off</span>} </p>
              <p>Product Name: {light[1].productname}</p>
            </div>
            <div className="card-action">
              <button className="btn-floating teal" onClick={() => toggleLight(light[0], true)}>On</button>
              <button className="btn-floating red" onClick={() => toggleLight(light[0], false)}>Off</button>
              {light[1].type.toLowerCase().includes("color") ? <button className="btn-floating pink" onClick={() => colorToggle(light[0])}>Color</button> : ''}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="container">
        <h1>No connected lights found</h1>
        <h4>Have you <Link to="/login">connected</Link> your hue bridge yet?</h4>
      </div>
    )
  }
  return (
    <div className="container">
      <div className={picker ? "show" : "no-show"} id="color-picker">
        <SketchPicker color={rgb} disableAlpha={true} onChangeComplete={(color) => updateColor(color.rgb)} />
      </div>
      <div className="container">
        {content}
      </div>
    </div>
  )
}
