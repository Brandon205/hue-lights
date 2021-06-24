import React from 'react';

export default function Home() {

    let show = (num) => {
        let descs = Array.from(document.querySelectorAll(".description"))
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
            <h4 className="question" onClick={() => show(0)}>What is Hue Lite?</h4>
            <p className="description no-show">
                Hue Lite is a simple and easy to use website that has little to no setup in order to control your Hue lights.
                From what I can tell there isn't really a site like this that allows for control of your lights from the web without
                having to download an app first, so here it is, though it is pretty basic so far...
            </p>
            <h4 className="question" onClick={() => show(1)}>How does it work?</h4>
            <div className="description no-show">
                <p>
                    This site uses React, Axios, and the Hue Developer API, to do everything, and has no backend in order to keep 
                    the speed and simplicity. Here is an example of it being used:
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/wnE3B5t_xBQ" title="Hue Lite Example Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <h4 className="question" onClick={() => show(2)}>How do you use it?</h4>
            <p className="description no-show">
                All you need to have done is is go through the basic setup of your devices on the Hue app, for now that is the only way that you can
                edit the names, groups, and other smaller settings like that, but future updates might add those features. Once the
                lights and bridge are set up, in a perfect world you would just open up this site and it will automatically find a 
                Hue Bridge on your network, have the IP Address of the bridge autofill, press the Link button on the bridge, and hit
                connect! But, this isn't a perfect world so go through the FAQ to try to troubleshoot any problems you might come across.
            </p>
            <h4 className="question" onClick={() => show(3)}>It is not working/connecting</h4>
            <p className="description no-show">
                1. The Bridge won't connect - Getting an error pop up - Make sure you are on the same WiFi network as the one that your bridge
                is connected to, and make sure that the IP you put in matches what the Hue app says it is. 2. The site says I'm connected but it
                isn't actually connected - This is a problem with how local storage works and what sites can access it if it is set on a different 
                site or even URL. This bug is still an issue that I am working on.
            </p>
            <h4 className="question" onClick={() => show(4)}>Do I always have to relink my Bridge?</h4>
            <p className="description no-show">
                Depending on the browser that you are using and the privacy features of it, there could be issues where it may say that you are connected but no lights are found. This site uses
                localStorage to keep the data that it needs stored in the browser, this feature seems to be somewhat 50/50 whether it works for this
                or not. Reconnecting doesn't hurt, all it does is adds a new "user" to the Hue API's whitelist. I am working/thinking of 
                ways around having to do that, and a fix should come soon. For now making sure to enable cookies for this site should help.
            </p>
            <br />
        </div>
    )
}