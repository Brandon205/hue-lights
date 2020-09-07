import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

export default function Lights(props) {
    const [lights, setLights] = useState([]);
    const [lightNumber, setLightNumber] = useState(0); // Set this value to whatever light the colorpicker is for at that time
    const [picker, setPicker] = useState(false); // Whether or not to display the Color Picker
    const [rgb, setRgb] = useState({"r": 255, "g": 255, "b": 255});

    useEffect(() => {
        Axios.get(props.url + '/lights').then(res => {
            let hueLights = Object.entries(res.data)
            setLights(hueLights)
        })
    }, [props.url])
  
    let turnOn = (lightNum) => {
      Axios.put(props.url + `/lights/${lightNum}/state`, {"on": true})
    }
  
    let turnOff = (lightNum) => {
      Axios.put(props.url + `/lights/${lightNum}/state`, {"on": false})
    }

    let colorToggle = (lightNum) => { // Show the color picker for the corresponding light
      let rgbColor; // Needs to return {r: 255, g: 255, b: 255} for react-color
      Axios.get(props.url + `/lights/${lightNum}`).then(res => {
        rgbColor = xyToRGB(res.data.state.xy[0], res.data.state.xy[1])
        setRgb(rgbColor)
      })
      setLightNumber(lightNum)
      setPicker(true)

      document.body.style.backgroundColor = "lightgray"
      document.querySelector('#color-picker').classList.add('show');
      document.querySelector('#color-picker').classList.remove('no-show');
      document.addEventListener('click', () => {
        document.querySelector('#color-picker').classList.add('no-show');
        document.querySelector('#color-picker').classList.remove('show');
        document.body.style.backgroundColor = "whitesmoke"
      }, {once: true})
    }

    let updateColor = (color) => { // For the onChangeComplete of the ColorPicker
      let xyColor = rgbToXY(color.r, color.g, color.b) // Needs to return [0.2345, 0.9876] for the Hue API
      xyColor.x = parseFloat(xyColor.x)
      xyColor.y = parseFloat(xyColor.y)
      Axios.put(props.url + `/lights/${lightNumber}/state`, {"xy": [xyColor.x, xyColor.y]})
    }
  
    let content = '';
    if (lights.length > 0) {
      content = lights.map((light, id) => 
      <div key={id - 1}>
        <h2>{light[1].name}</h2>
        <button onClick={() => turnOn(light[0])}>On</button>
        <button onClick={() => turnOff(light[0])}>Off</button>
        {light[1].type.toLowerCase().includes("color") ? <button onClick={() => colorToggle(light[0])}>Color</button> : ''}
      </div>);
    }
    return (
        <div className="lights">
            <h1>Your Lights</h1>
            <div className={picker ? "show" : "no-show"} id="color-picker">
              <SketchPicker color={rgb} disableAlpha={true} onChangeComplete={(color) => updateColor(color.rgb)} />
            </div>
            {content}
        </div>
    )
}
