import React from 'react';
import Lights from './Lights';
import Groups from './Groups';
import './App.css';

// const username = "f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // DELETE SOMETIME
const url = "http://192.168.1.138/api/f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // THIS TOO

export default function App() {
  return (
    <div className="App">
      <Lights url={url} />
      <Groups url={url} />
    </div>
  )
}
