import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Groups(props) {
    const [groups, setGroups] = useState([])

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

    let content;
    if (groups.length > 0) {
        content = groups.map((group, id) => 
        <div key={id}>
            <h2>{group[1].name}</h2>
            <button onClick={() => toggleLights(group[0], true)}>All On</button>
            <button onClick={() => toggleLights(group[0], false)}>All Off</button>
        </div>);
    } else {
        content = (<h2>No Groups made yet</h2>)
    }
    return (
        <div className="App">
            <h1>Groups Page</h1>
            {content}
        </div>
    )
}
