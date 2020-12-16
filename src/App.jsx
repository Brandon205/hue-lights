import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import M from 'materialize-css';
import Axios from 'axios';
import Home from './Home';
import Lights from './Lights';
import Groups from './Groups';
import Connect from './Connect';
import './App.css';

export default function App() {
  const [url, setUrl] = useState('default');
  const [connected, setConnected] = useState(false);
  const [ip, setIp] = useState('');
  const [redirect, setRedirect] = useState(false)

  useEffect(() => { // To see if the user already has info in LS
    if (localStorage.getItem('hue-info') === null) { //TODO: add a better check than just LS (contact hue api to check for errors?)
      setConnected(false)
    } else {
      let info = localStorage.getItem('hue-info').split(',')
      setConnected(true)
      setUrl(`https://${info[0]}/api/${info[1]}`)
    }
  }, [])

  let updateUrl = (e) => { // Sets the URL for the REST API
    e.preventDefault();
    Axios.post(`https://${ip}/api`, {"devicetype": "YAHWA#user"}).then(res => {
      if (res.data[0].error) {
        if (res.data[0].error.type === 101) {
          createToast('Link button not pressed', 'red')
        } else {
          createToast('An error occured, please try again', 'red')
        }
      } else {
        let username = res.data[0].success.username
        localStorage.setItem('hue-info', `${ip},${username}`)
        let tempUrl = `https://${ip}/api/${username}`
        setUrl(tempUrl);
        setConnected(true)
        createToast('Connection success!', 'green')
      }
    })
  }

  let createToast = (message, classes="") => {
    M.toast({html: message, classes: classes})
  }

  let disconnect = () => {
    setIp('')
    localStorage.removeItem('hue-info')
    setRedirect(true)
  }

  let login;
  if (connected) {
    login = (
      <div className="container bottom-gap">
        <h2>Your Hue bridge is <Link to='/connect' className="green-text text-darken-3">connected</Link>.</h2>
        <button className="btn red" onClick={disconnect}>Disconnect</button>
      </div>
    )
  } else {
    login = (
      <div className="container bottom-gap">
        <h2>Connect your Hue Bridge</h2>
        <form>
          <label className="active" htmlFor="ip">Hue Bridge IP Address</label>
          <input className="validate" type="text" name="ip" id="ip" placeholder="Hue Bridge IP" value={ip} onChange={(e) => setIp(e.target.value)} required />
          <input type="submit" value="Connect" onClick={(e) => updateUrl(e)} />
        </form>
        <div className="tooltip">How to find a Hue Bridge IP Address
          <span className="tooltiptext">To find your Hue Bridges' IP Address: 1. Open the Hue App and go settings/Hue Bridges 2. Find the Bridge you want to connect to and hit the i icon on the right hand side 3. Note the IP shown there</span>
        </div>
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
            {redirect ? <Redirect to="/connect" /> : ''}
          </div>
        </nav>
      </header>
      <main>
        <div className="no-show" id="cover-div"></div>
        <Route exact path="/" component={Home} />
        <Route exact path="/lights" render={() => <Lights url={url} sendToast={createToast} />} /> 
        <Route exact path="/groups" render={() => <Groups url={url} sendToast={createToast} />} />
        <Route exact path="/connect" render={() => <Connect url={url} updateURL={updateUrl} ip={ip} setIP={setIp} />} />
        {login}
      </main>
    </Router>
  )
}
