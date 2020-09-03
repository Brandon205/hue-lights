import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

// const username = "f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // DELETE SOMETIME
const url = "http://192.168.1.138/api/f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // THIS TOO

export default function App() {
  const [lights, setLights] = useState([]);

  let getLights = () => {
    Axios.get(url + "/lights").then(res => {
      let hueLights = Object.keys(res.data)
      setLights(hueLights)
    })
  }

  let turnOn = (lightNum) => {
    Axios.put(url + `/lights/${lightNum}/state`, {"on": true})
  }

  let turnOff = (lightNum) => {
    Axios.put(url + `/lights/${lightNum}/state`, {"on": false})
  }

  let content = '';
  if (lights.length > 0) {
    console.log(lights)
    content = lights.map((light, id) => <div key={id}><h1>{light}</h1><button onClick={() => turnOn(light)}>On</button><button onClick={() => turnOff(light)}>Off</button></div>)
  }
  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={() => getLights()}>Get Lights</button>
      {content}
    </div>
  )
}
