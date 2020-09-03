import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

// const username = "f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // DELETE SOMETIME
const url = "http://192.168.1.138/api/f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // THIS TOO

export default function App() {
  const [lights, setLights] = useState([]);

  let getLights = () => {
    Axios.get(url).then(res => {
      let hueLights = Object.keys(res.data.lights)
      setLights(hueLights)
    })
  }

  let turnOn = (lightNum) => {
    console.log(lightNum)
    // Axios.put(url + "/lights/" + lightNum + "/state", {"on": true})
  }

  let turnOff = (lightNum) => {
    Axios.put(url + "/lights/" + lightNum + "/state", {"on": false})
  }

  let content = '';
  if (lights.length > 0) {
    console.log(lights)
    content = lights.map((light, id) => <div key={id}><h1>{light}</h1><button onClick={(light) => turnOn(light)}>On</button><button onClick={(light) => turnOff(light)}>Off</button></div>)
  }
  return (
    <div className="App">
      <h1>Hi</h1>
      <button onClick={() => getLights()}>Get Lights</button>
      {content}
    </div>
  )
}
