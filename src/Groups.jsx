import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { rgbToXY, xyToRGB } from './colorConverter.js';
import Axios from 'axios';

export default function Groups(props) {
    const [lightSwitch, setLightSwitch] = useState(false); // To refetch the API when the lights are toggled
    const [groups, setGroups] = useState([]);
    const [picker, setPicker] = useState(false); // Whether or not to display the Color Picker
    const [groupNum, setGroupNum] = useState(0);
    const [rgb, setRgb] = useState({"r": 255, "g": 255, "b": 255}); // Color Picker color

    useEffect(() => { // Will get all groups as long as there is a URL given
        if (props.url !== "default") {
            Axios.get(props.url + "/groups").then(res => {
                let hueGroups = Object.entries(res.data)
                setGroups(hueGroups)
            })
        }
    }, [props.url, lightSwitch])

    let toggleLights = (groupNum, on) => { // Toggles all lights in the group
        Axios.put(props.url + `/groups/${groupNum}/action`, {'on': on})
        setLightSwitch(!lightSwitch)
    }

    let colorToggle = (groupNum) => { // Show the color picker for the corresponding light
        let rgbColor; // Needs to return {r: 255, g: 255, b: 255} for react-color
        Axios.get(props.url + `/groups/${groupNum}`).then(res => {
          rgbColor = xyToRGB(res.data.action.xy[0], res.data.action.xy[1])
          setRgb(rgbColor)
        })
        setGroupNum(groupNum)
        setPicker(true)

        // Set classes for different effects and to display the color picker
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
    if (groups.length > 0) { // Displays all groups if the useEffect found any
        content = groups.map((group, id) => 
            <div className="col s6 offset-s3 m6" key={id}>
                <h2 className="header">{group[1].name}</h2>
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <img src={`${process.env.PUBLIC_URL}/images/${group[1].class}.svg`} alt={group[1].class} />
                            <p>Lights are currently {group[1].state.any_on ? <span className="green-text text-darken-3">On</span> : <span className="red-text">Off</span>} </p>
                        </div>
                        <div className="card-action center">
                            {/* <button className="btn-floating teal" onClick={() => toggleLights(group[0], true)}>On</button>
                            <button className="btn-floating red" onClick={() => toggleLights(group[0], false)}>Off</button>
                            <button className="btn-floating pink" onClick={() => colorToggle(group[0])}>Color</button> */}
                            <button className="waves-effect waves-light btn teal" onClick={() => toggleLights(group[0], true)}>On</button>
                            <button className="waves-effect waves-light btn red" onClick={() => toggleLights(group[0], false)}>Off</button>
                            <button className="waves-effect waves-light btn pink" onClick={() => colorToggle(group[0])}>Color</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="container">
                <h1>No created groups found</h1>
                <h4>Have you <Link to="/Login">connected</Link> your hue bridge yet?</h4>
            </div>);
        //TODO: Create group form here
    }
    return (
        <div className="container">
            <div className={picker ? "show" : "no-show"} id="group-color-picker">
              <SketchPicker color={rgb} disableAlpha={true} onChangeComplete={(color) => updateColor(color.rgb)} />
            </div>
            {content}
        </div>
    )
}
