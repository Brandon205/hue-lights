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

    let content;
    if (groups.length > 0) {
        console.log(groups)
        content = groups.map((group, id) => <div key={id}><h2>{group[1].name}</h2></div>)
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
