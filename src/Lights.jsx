import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

// Notes: bri: 1-254, ct: 500(warmest)-153(coldest), hue: 0-65535

export default function Lights(props) {
    const [lights, setLights] = useState([]);
    const [lightNumber, setLightNumber] = useState(0); // Set this value to whatever light the colorpicker is for at that time
    const [picker, setPicker] = useState(false); // Whether or not to display the Color Picker

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
      setLightNumber(lightNum)
      setPicker(true)

      // let rgbColor; // Needs to return {r: 255, g: 255, b: 255} for react-color
      // Axios.get(props.url + `/lights${lightNum}`).then(res => {
      //   rgbColor = xyToRGB(res.data.state.xy[0], res.data.state.xy[1])
      //   TODO: Set state here to ^^, and load that state into the color param of the ColorPicker
      // })
    }

    let updateColor = (color) => { // For the onChangeComplete of the ColorPicker
      let xyColor = rgbToXY(color.r, color.g, color.b) // Needs to return [0.2345, 0.9876] for the Hue API
      xyColor.x = parseFloat(xyColor.x)
      xyColor.y = parseFloat(xyColor.y)
      Axios.put(props.url + `/lights/${lightNumber}/state`, {"xy": [xyColor.x, xyColor.y]}).then(res => {
        console.log(res.data)
      })
    }
  
    let content = '';
    if (lights.length > 0) {
      // content = lights.map((light, id) => <div key={id}><h1>{light}</h1><button onClick={() => turnOn(light)}>On</button><button onClick={() => turnOff(light)}>Off</button><button onClick={() => colorToggle(light)}>Color</button></div>)
      content = lights.map((light, id) => <div key={id - 1}><h1>{light[1].name}</h1><button onClick={() => turnOn(light[0])}>On</button><button onClick={() => turnOff(light[0])}>Off</button><button onClick={() => colorToggle(light[0])}>Color</button></div>);
    }
    return (
        <div className="App">
            <h1>Your Lights</h1>
            <div className={picker ? "show" : "no-show"}>
              <SketchPicker disableAlpha={true} onChangeComplete={(color) => updateColor(color.rgb)} />
            </div>
            {content}
        </div>
    )
}
