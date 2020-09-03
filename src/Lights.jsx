import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import Axios from 'axios';

// Notes: bri: 1-254, ct: 500(warmest)-153(coldest), hue: 0-65535

export default function Lights(props) {
    const [lights, setLights] = useState([]);

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
  
    let content = '';
    if (lights.length > 0) {
      content = lights.map((light, id) => <div key={id}><h1>{light}</h1><button onClick={() => turnOn(light)}>On</button><button onClick={() => turnOff(light)}>Off</button></div>)
    }
    return (
        <div className="App">
            <h1>Lights Page</h1>
            <ChromePicker color="#fff" onChangeComplete={console.log("color.hex")} />
            {content}
        </div>
    )
}
