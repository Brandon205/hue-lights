import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

// Notes: bri: 1-254, ct: 500(warmest)-153(coldest), hue: 0-65535

export default function Lights(props) {
    const [lights, setLights] = useState([]);
    const [picker, setPicker] = useState(false);

    useEffect(() => {
        Axios.get(props.url + '/lights').then(res => {
            let hueLights = Object.keys(res.data)
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
      Axios.get(props.url + `/lights${lightNum}`).then(res => {
        rgbColor = xyToRGB(res.data.state.xy[0], res.data.state.xy[1])
      })
    }

    let updateColor = (lightNum, color) => { // For the onChangeComplete of the ColorPicker
      let xyColor = rgbToXY(color[0], color[1], color[2]) // Needs to return [0.2345, 0.9876] for the Hue API
      Axios.put(props.url + `/lights/${lightNum}/state`, {"xy": xyColor})
    }
  
    let content = '';
    if (lights.length > 0) {
      content = lights.map((light, id) => <div key={id}><h1>{light}</h1><button onClick={() => turnOn(light)}>On</button><button onClick={() => turnOff(light)}>Off</button><button onClick={() => colorToggle(light)}>Color</button></div>)
    }
    return (
        <div className="App">
            <h1>Lights Page</h1>
            <SketchPicker class="none" disableAlpha={true} onChangeComplete={(color) => console.log(color)} />
            {content}
        </div>
    )
}
