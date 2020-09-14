import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Axios from 'axios';
import Home from './Home';
import Lights from './Lights';
import Groups from './Groups';
import './App.css';

export default function App() {
  const [url, setUrl] = useState('default');
  const [connected, setConnected] = useState(false);
  const [ip, setIp] = useState('');

  useEffect(() => { // To see if the user already has info in LS
    if (localStorage.getItem('hue-ip') === null) {
      setConnected(false)
    } else {
      let info = localStorage.getItem('hue-ip').split(',')
      setConnected(true)
      setUrl(`https://${info[0]}/api/${info[1]}`)
    }
  }, [])

  let updateUrl = (e) => { // Sets the URL for the REST API
    e.preventDefault();
    let username;
    Axios.post(`https://${ip}/api`, {"devicetype": "YAHWA#user"}).then(res => {
      if (res.data[0].error) {
        console.log('Link button not pressed')
      } else {
        username = res.data[0].success.username
        localStorage.setItem('hue-ip', `${ip},${res.data[0].success.username}`)
        let tempUrl = `https://${ip}/api/${username}`
        setUrl(tempUrl);
      }
    })
  }

  let login;
  if (connected) { // Check if Bridge is connected to display login or success message respectively TODO: Add disconnect button to connected message (resets LS)
    login = (
      <div className="container">
        <h2>Your Hue bridge is <span className="green-text text-darken-3">connected</span>.</h2>
      </div>
    )
  } else {
    login = (
      <div className="container">
        <h2>Connect your Hue Bridge</h2>
        <form>
          <input className="validate" type="text" name="ip" id="ip" placeholder="Hue Bridge IP" value={ip} onChange={(e) => setIp(e.target.value)} required />
          <input type="submit" value="Connect" onClick={(e) => updateUrl(e)} />
        </form>
        </div>
    )
  }

  return (
    <Router>
      <header>
        <nav>
          <div className="nav-wrapper">
            <Link className="brand-logo" to="/">Hue App</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/lights">Lights</Link></li>
              <li><Link to="/groups">Groups</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <div className="no-show" id="cover-div"></div>
        <Route exact path="/" component={Home} />
        <Route exact path="/lights" render={() => <Lights url={url} />} /> 
        <Route exact path="/groups" render={() => <Groups url={url} />} />
        {login}
      </main>
    </Router>
  )
}
