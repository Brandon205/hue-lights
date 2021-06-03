import React from 'react';

export default function Home() {

    let show = (num) => {
        let descs = Array.from(document.querySelectorAll("p"))
        if (descs[num].classList.length > 1) {
            descs[num].classList.remove("no-show")
        } else {
            descs[num].classList.add("no-show")
        }
    }

    return (
        <div className="container">
            <br />
            <h1 className="faq">FAQ</h1>
            <h4 className="question" onClick={() => show(0)}>What is it?</h4>
            <p className="description no-show">
                Hue Lite is a simple and easy to use website that has little to no setup in order to control your Hue lights.
                From what I can tell there isn't really a site like this that allows for control of your lights from the web without
                having to download an app first, so here it is, though it is very basic so far...
            </p>
            <h4 className="question" onClick={() => show(1)}>How does it?</h4>
            <p className="description no-show">
                This site uses React, Axios, and the Hue Developer API, to do everything, and has no backend in order to keep 
                the simplicity and speed.
            </p>
            <h4 className="question" onClick={() => show(2)}>How do you use it?</h4>
            <p className="description no-show">
                All you need to have done is is go through the basic setup through Hue, for now that is the only way that you can
                edit the names, groups, and other smaller settings like that, but future updates might add those features. Once the
                lights and bridge are setup in a perfect world you would just open up this site and it will automatically find a 
                Hue Bridge on your network, fill in the IP Address of that bridge, and all you will have to do is press the Link button
                on the bridge, and hit connect! But, this isn't a perfect world so hover over the "How to find a Hue Bridge's IP Address"
                text and it will go step by step on using the Hue App to find it.
            </p>
            <h4 className="question" onClick={() => show(3)}>It is not working/connecting</h4>
            <p className="description no-show">
                There are many things that can go wrong in something like this but here are some of the most common problems I have had so
                far. 1. The Bridge won't connect - Getting an error pop up - Make sure you are on the same WiFi as the one that the bridge
                is connected to, and make sure that the IP is matches what the Hue app says it is. 2. The lights are not updating when I change
                something on the website - Go ahead and disconnect and connect again, this should fix this problem because it resets all of the 
                user information that is needed for the Hue API.
            </p>
            <h4 className="question" onClick={() => show(4)}>Do I always have to relink my Bridge?</h4>
            <p className="description no-show">
                Depending on the browser that you are using and the privacy features of it this could be a problem caused by those. The site uses
                localStorage to keep the data that it needs stored in the browser, this feature seems to be somewhat 50/50 whether it works with 
                this site or not, reconnecting doesn't hurt, all it does is adds a new "user" to the Hue API's whitelist. I am working/thinking of 
                ways around having to do that, and a fix should come soon. For now making sure to enable cookies should help.
            </p>
            <br />
        </div>
    )
}