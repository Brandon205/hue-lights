import React from 'react';

export default function Home() {
    return (
        <div className="container">
            <h1>Welcome to Hue Web</h1>
            <h4 className="question">What is it?</h4>
            <p className="description">
                Hue Web is a simple and easy to use website that has little to no setup. It 

            </p>
            <h4 className="question">How does it?</h4>
            <p className="description">
                This site uses React, Axios, and the Hue Developer API, to do everything, has no backend to it in order to keep 
                the simplicity and speed.
            </p>
            <h4 className="question">How do you use it?</h4>
            <p className="description">
                All you need to have done is is go through the basic setup through Hue, for now that is the only way that you can
                edit the names, groups, and other smaller settings like that, but future updates might add those features. Once the
                lights and bridge are setup in a perfect world you would just open up this site and it will automatically find a 
                Hue Bridge on your network, fill in the IP Address of that bridge, and all you will have to do is press the Link button
                on the bridge, and hit connect! But, this isn't a perfect world so hover over the "How to find a Hue Bridge's IP Address"
                text and it will go step by step on using the Hue App to find it.
            </p>
            <h4 className="question">It is not working/connecting</h4>
            <p className="description">
                There are many things that can go wrong in something like this but here are some of the most common problems I have had so
                far. 1. The Bridge won't connect - Getting an error pop up - Make sure you are on the same WiFi as the one that the bridge
                is connected to, and make sure that the IP is matches what the Hue app says it is. 2. The lights are not updating when I change
                something on the website - Go ahead and disconnect and connect again, this should fix this problem because it resets all of the 
                user information that is needed for the Hue API.
            </p>
        </div>
    )
}