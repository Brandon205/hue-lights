import React from 'react';

export default function Login(props) {
    return (
        <div className="container">
            <h2>Connect your Hue Bridge</h2>
            <h4>Do NOT do this on computers/devices that you don't trust</h4>
            <form>
                <label className="active" htmlFor="ip">Hue Bridge IP Address</label>
                <input className="validate" type="text" name="ip" id="ip" placeholder="Hue Bridge IP" value={props.ip} onChange={(e) => props.setIp(e.target.value)} required />
                <input type="submit" value="Connect" onClick={(e) => props.updateURL(e)} />
            </form>
            <div className="tooltip">How to find a Hue Bridge IP Address
            <span className="tooltiptext">To find your Hue Bridges' IP Address: 1. Open the Hue App and go settings/Hue Bridges 2. Find the Bridge you want to connect to and hit the i icon on the right hand side 3. Note the IP shown there</span>
            </div>
        </div>
    )
}