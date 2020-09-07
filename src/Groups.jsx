import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

export default function Groups(props) {
    const [groups, setGroups] = useState([]);
    const [picker, setPicker] = useState(false); // Whether or not to display the Color Picker
    const [groupNum, setGroupNum] = useState(0);
    const [rgb, setRgb] = useState({"r": 255, "g": 255, "b": 255}); // Color Picker color

    useEffect(() => {
        Axios.get(props.url + "/groups").then(res => {
            let hueGroups = Object.entries(res.data)
            setGroups(hueGroups)
        })
    }, [props.url])

    let toggleLights = (groupNum, on) => {
        if (on) {
            Axios.put(props.url + `/groups/${groupNum}/action`, {'on': true})
        } else {
            Axios.put(props.url + `/groups/${groupNum}/action`, {'on': false})
        }
    }

    let colorToggle = (groupNum) => { // Show the color picker for the corresponding light
        let rgbColor; // Needs to return {r: 255, g: 255, b: 255} for react-color
        Axios.get(props.url + `/groups/${groupNum}`).then(res => {
          rgbColor = xyToRGB(res.data.action.xy[0], res.data.action.xy[1])
          setRgb(rgbColor)
        })
        setGroupNum(groupNum)
        setPicker(true)
  
        document.body.style.backgroundColor = "lightgray"
        document.querySelector('#group-color-picker').classList.add('show');
        document.querySelector('#group-color-picker').classList.remove('no-show');
        document.addEventListener('click', () => {
          document.querySelector('#group-color-picker').classList.add('no-show');
          document.querySelector('#group-color-picker').classList.remove('show');
          document.body.style.backgroundColor = "whitesmoke"
        }, {once: true})
      }
  
      let updateColor = (color) => { // For the onChangeComplete of the ColorPicker
        let xyColor = rgbToXY(color.r, color.g, color.b) // Needs to return [0.2345, 0.9876] for the Hue API
        xyColor.x = parseFloat(xyColor.x)
        xyColor.y = parseFloat(xyColor.y)
        Axios.put(props.url + `/groups/${groupNum}/action`, {"xy": [xyColor.x, xyColor.y]})
      }

    let content;
    if (groups.length > 0) {
        content = groups.map((group, id) => 
        <div key={id}>
            <h2>{group[1].name}</h2>
            <button onClick={() => toggleLights(group[0], true)}>All On</button>
            <button onClick={() => toggleLights(group[0], false)}>All Off</button>
            <button onClick={() => colorToggle(group[0])}>Color</button>
        </div>);
    } else {
        content = (<h2>No Groups made yet</h2>)
    }
    return (
        <div className="App">
            <h1>Your Groups</h1>
            <div className={picker ? "show" : "no-show"} id="group-color-picker">
              <SketchPicker color={rgb} disableAlpha={true} onChangeComplete={(color) => updateColor(color.rgb)} />
            </div>
            {content}
        </div>
    )
}
