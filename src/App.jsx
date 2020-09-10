import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Lights from './Lights';
import Groups from './Groups';
import './App.css';

const url = "http://192.168.1.138/api/f5y86pTphO238JSQkZSKMhXusS5l3kDsvoWhv9xw" // THIS TOO

export default function App() {
  return (
    <Router>
      <nav>
        <div className="nav-wrapper">
          <Link className="brand-logo" to="/">Hue App</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/lights">Lights</Link></li>
            <li><Link to="/groups">Groups</Link></li>
          </ul>
        </div>
      </nav>
      <div className="no-show" id="cover-div"></div>
      <Route exact path="/" component={Home} />
      <Route exact path="/lights" render={() => <Lights url={url} />} /> 
      <Route exact path="/groups" render={() => <Groups url={url} />} />
    </Router>
  )
}
