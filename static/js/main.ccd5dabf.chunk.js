(this["webpackJsonphue-lights"]=this["webpackJsonphue-lights"]||[]).push([[0],{109:function(e,t,a){e.exports=a(303)},114:function(e,t,a){},302:function(e,t,a){},303:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(106),c=a.n(r),s=(a(114),a(6)),l=a(18),i=a(3),u=a(107),d=a.n(u),m=a(7),h=a.n(m);function p(){return o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"Welcome to Hue Web"),o.a.createElement("h4",{className:"question"},"What is it?"),o.a.createElement("p",{className:"description"},"Hue Web is a simple and easy to use website that has little to no setup. It"),o.a.createElement("h4",{className:"question"},"How does it?"),o.a.createElement("p",{className:"description"},"This site uses React, Axios, and the Hue Developer API, to do everything, has no backend to it in order to keep the simplicity and speed."),o.a.createElement("h4",{className:"question"},"How do you use it?"),o.a.createElement("p",{className:"description"},"All you need to have done is is go through the basic setup through Hue, for now that is the only way that you can edit the names, groups, and other smaller settings like that, but future updates might add those features. Once the lights and bridge are setup in a perfect world you would just open up this site and it will automatically find a Hue Bridge on your network, fill in the IP Address of that bridge, and all you will have to do is press the Link button on the bridge, and hit connect! But, this isn't a perfect world so hover over the \"How to find a Hue Bridge's IP Address\" text and it will go step by step on using the Hue App to find it."),o.a.createElement("h4",{className:"question"},"It is not working/connecting"),o.a.createElement("p",{className:"description"},"There are many things that can go wrong in something like this but here are some of the most common problems I have had so far. 1. The Bridge won't connect - Getting an error pop up - Make sure you are on the same WiFi as the one that the bridge is connected to, and make sure that the IP is matches what the Hue app says it is. 2. The lights are not updating when I change something on the website - Go ahead and disconnect and connect again, this should fix this problem because it resets all of the user information that is needed for the Hue API."))}var g=a(39),b=function(e,t,a,n,o){return(e-t)*(o-n)/(a-t)+n};function f(e,t,a){e=b(e,0,255,0,1),t=b(t,0,255,0,1),a=b(a,0,255,0,1);var n=e>.04045?Math.pow((e+.055)/1.055,2.4):e/12.92,o=t>.04045?Math.pow((t+.055)/1.055,2.4):t/12.92,r=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92,c=.649926*n+.103455*o+.197109*r,s=.234327*n+.743075*o+.022598*r,l=0*n+.053077*o+1.035763*r,i=c/(c+s+l),u=s/(c+s+l);return{x:Number.parseFloat(i).toFixed(4),y:Number.parseFloat(u).toFixed(4)}}function v(e,t,a){var n=a/t*e,o=a/t*(1-e-t),r=1.656492*n-.354851*a-.255038*o,c=.707196*-n+1.655397*a+.036152*o,s=.051713*n-.121364*a+1.01153*o,l=r<=.0031308?12.92*r:1.055*Math.pow(r,1/2.4)-.055,i=c<=.0031308?12.92*c:1.055*Math.pow(c,1/2.4)-.055,u=s<=.0031308?12.92*s:1.055*Math.pow(s,1/2.4)-.055;return{r:Math.round(b(l,0,17,0,255)),g:Math.round(b(i,0,17,0,255)),b:Math.round(b(u,0,17,0,255))}}function E(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)([]),u=Object(s.a)(i,2),d=u[0],m=u[1],p=Object(n.useState)(0),b=Object(s.a)(p,2),E=b[0],w=b[1],y=Object(n.useState)(!1),N=Object(s.a)(y,2),k=N[0],O=N[1],S=Object(n.useState)({r:255,g:255,b:255}),j=Object(s.a)(S,2),x=j[0],H=j[1];Object(n.useEffect)((function(){"default"!==e.url&&h.a.get(e.url+"/lights").then((function(e){var t=Object.entries(e.data);m(t)}))}),[e.url,r]);var C,I=function(t,a){h.a.put(e.url+"/lights/".concat(t,"/state"),{on:a}),c(!r)};return C=d.length>0?d.map((function(t,a){return o.a.createElement("div",{className:"col s6 offset-s3 m6",key:a},o.a.createElement("div",{className:"card horizontal"},o.a.createElement("div",{className:"card-stacked"},o.a.createElement("div",{className:"card-content"},o.a.createElement("h4",{className:"header"},t[1].name),r,o.a.createElement("img",{src:"".concat("/hue-lights","/images/").concat(t[1].productname,".svg"),alt:t[1].productname}),o.a.createElement("p",null,o.a.createElement("span",{className:"blue-text bold"},t[1].name)," is currently ",t[1].state.on?o.a.createElement("span",{className:"green-text bold"},"On"):o.a.createElement("span",{className:"red-text bold"},"Off")," "),o.a.createElement("p",null,"Product Name: ",t[1].productname)),o.a.createElement("div",{className:"card-action"},o.a.createElement("button",{className:"waves-effect waves-light btn-large teal",onClick:function(){return I(t[0],!0)}},"On"),o.a.createElement("button",{className:"waves-effect waves-light btn-large red",onClick:function(){return I(t[0],!1)}},"Off"),t[1].type.toLowerCase().includes("color")?o.a.createElement("button",{className:"waves-effect waves-light btn-large pink",onClick:function(){return function(t){var a;h.a.get(e.url+"/lights/".concat(t)).then((function(e){a=v(e.data.state.xy[0],e.data.state.xy[1],e.data.state.bri),H(a)})),w(t),O(!0),document.querySelector("#color-picker").classList.add("show"),document.querySelector("#color-picker").classList.remove("no-show"),document.querySelector("#cover-div").classList.add("opaque-div"),document.querySelector("#cover-div").classList.remove("no-show"),document.addEventListener("click",(function(){document.querySelector("#color-picker").classList.remove("show"),document.querySelector("#color-picker").classList.add("no-show"),document.querySelector("#cover-div").classList.add("no-show"),document.querySelector("#cover-div").classList.remove("opaque-div")}),{once:!0})}(t[0])}},"Color"):"",o.a.createElement("form",{autoComplete:"off",onSubmit:function(a){return function(t,a){t.preventDefault();var n=Number(t.target.elements[0].value);n>254||n<0?e.sendToast("Needs to be a value between 0 and 254","red"):(h.a.put(e.url+"/lights/".concat(a,"/state"),{bri:n}),e.sendToast("Set the brightness to ".concat(n," on light number ").concat(a),"green"))}(a,t[0])}},o.a.createElement("div",{className:"container"},o.a.createElement("input",{className:"validate",type:"text",name:"brightness",placeholder:"Brightness: "+t[1].state.bri+" (between 0 and 254)"})),o.a.createElement("button",{className:"waves-effect waves-light btn-large grey"},"Update Brightness"))))))})):o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"No connected lights found"),o.a.createElement("h4",null,"Have you ",o.a.createElement(l.b,{to:"/login"},"connected")," your hue bridge yet?")),o.a.createElement("div",{className:"container"},o.a.createElement("h2",{style:{marginTop:0}},"Lights"),o.a.createElement("div",{className:k?"show":"no-show",id:"color-picker"},o.a.createElement(g.SketchPicker,{width:"15vw",color:x,disableAlpha:!0,onChangeComplete:function(t){return function(t){var a=f(t.r,t.g,t.b);a.x=parseFloat(a.x),a.y=parseFloat(a.y),h.a.put(e.url+"/lights/".concat(E,"/state"),{xy:[a.x,a.y]})}(t.rgb)}})),o.a.createElement("div",{className:"container"},C))}function w(e){var t=Object(n.useState)(!1),a=Object(s.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)([]),u=Object(s.a)(i,2),d=u[0],m=u[1],p=Object(n.useState)(!1),b=Object(s.a)(p,2),E=b[0],w=b[1],y=Object(n.useState)(0),N=Object(s.a)(y,2),k=N[0],O=N[1],S=Object(n.useState)({r:255,g:255,b:255}),j=Object(s.a)(S,2),x=j[0],H=j[1];Object(n.useEffect)((function(){"default"!==e.url&&h.a.get(e.url+"/groups").then((function(e){var t=Object.entries(e.data);m(t)}))}),[e.url,r]);var C,I=function(t,a){h.a.put(e.url+"/groups/".concat(t,"/action"),{on:a}),c(!r)};return C=d.length>0?d.map((function(t,a){return o.a.createElement("div",{className:"col s6 offset-s3 m6",key:a},o.a.createElement("div",{className:"card horizontal"},o.a.createElement("div",{className:"card-stacked"},o.a.createElement("div",{className:"card-content"},o.a.createElement("h4",{className:"header"},t[1].name),r,o.a.createElement("img",{src:"".concat("/hue-lights","/images/").concat(t[1].class,".svg"),alt:t[1].class}),o.a.createElement("p",null,"Lights are currently ",t[1].state.any_on?o.a.createElement("span",{className:"green-text bold"},"On"):o.a.createElement("span",{className:"red-text "},"Off")," ")),o.a.createElement("div",{className:"card-action"},o.a.createElement("button",{className:"waves-effect waves-light btn-large teal",onClick:function(){return I(t[0],!0)}},"On"),o.a.createElement("button",{className:"waves-effect waves-light btn-large red",onClick:function(){return I(t[0],!1)}},"Off"),o.a.createElement("button",{className:"waves-effect waves-light btn-large pink",onClick:function(){return function(t){var a;h.a.get(e.url+"/groups/".concat(t)).then((function(e){a=v(e.data.action.xy[0],e.data.action.xy[1]),H(a)})),O(t),w(!0),document.body.style.backgroundColor="lightgray",document.querySelector("#group-color-picker").classList.add("show"),document.querySelector("#group-color-picker").classList.remove("no-show"),document.addEventListener("click",(function(){document.querySelector("#group-color-picker").classList.add("no-show"),document.querySelector("#group-color-picker").classList.remove("show"),document.body.style.backgroundColor="whitesmoke"}),{once:!0})}(t[0])}},"Color"),o.a.createElement("form",{autoComplete:"off",onSubmit:function(a){return function(t,a){t.preventDefault();var n=Number(t.target.elements[0].value);n>254||n<0?e.sendToast("Needs to be a value between 0 and 254","red"):(h.a.put(e.url+"/groups/".concat(a,"/action"),{bri:n}),e.sendToast("Set the brightness to ".concat(n," on group number ").concat(a),"green"))}(a,t[0])}},o.a.createElement("div",{className:"container"},o.a.createElement("input",{className:"validate",type:"text",name:"brightness",placeholder:"Brightness: "+t[1].action.bri+" (between 0 and 254)"})),o.a.createElement("button",{className:"waves-effect waves-light btn-large grey"},"Update Brightness"))))))})):o.a.createElement("div",{className:"container"},o.a.createElement("h1",null,"No created groups found"),o.a.createElement("h4",null,"Have you ",o.a.createElement(l.b,{to:"/Login"},"connected")," your hue bridge yet?")),o.a.createElement("div",{className:"container"},o.a.createElement("h2",{style:{marginTop:0}},"Groups"),o.a.createElement("div",{className:E?"show":"no-show",id:"group-color-picker"},o.a.createElement(g.SketchPicker,{color:x,disableAlpha:!0,onChangeComplete:function(t){return function(t){var a=f(t.r,t.g,t.b);a.x=parseFloat(a.x),a.y=parseFloat(a.y),h.a.put(e.url+"/groups/".concat(k,"/action"),{xy:[a.x,a.y]})}(t.rgb)}})),o.a.createElement("div",{className:"container"},C))}a(302);function y(){var e=Object(n.useState)("default"),t=Object(s.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),u=Object(s.a)(c,2),m=u[0],g=u[1],b=Object(n.useState)(""),f=Object(s.a)(b,2),v=f[0],y=f[1],N=Object(n.useState)(!1),k=Object(s.a)(N,2),O=k[0],S=k[1];Object(n.useEffect)((function(){if(null===localStorage.getItem("hue-info"))g(!1);else{var e=localStorage.getItem("hue-info").split(",");g(!0),r("https://".concat(e[0],"/api/").concat(e[1]))}h.a.get("https://discovery.meethue.com").then((function(e){void 0!==e.data[0]?(y(e.data[0].internalipaddress),x("Autofilled your Hue's IP Address","green")):x("Not able to find IP Address of a Bridge on your WiFi","orange")}))}),[]);var j,x=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";d.a.toast({html:e,classes:t})};return j=m?o.a.createElement("div",{className:"container bottom-gap"},o.a.createElement("h2",null,"Your Hue bridge is ",o.a.createElement(l.b,{to:"/login",className:"green-text text-darken-3"},"connected"),"."),o.a.createElement("button",{className:"btn red",onClick:function(){y(""),localStorage.removeItem("hue-info"),S(!0)}},"Disconnect")):o.a.createElement("div",{className:"container bottom-gap"},o.a.createElement("h2",null,"Connect your Hue Bridge"),o.a.createElement("form",null,o.a.createElement("label",{className:"active",htmlFor:"ip"},"Hue Bridge IP Address"),o.a.createElement("input",{className:"validate",type:"text",name:"ip",id:"ip",placeholder:"Hue Bridge IP",value:v,onChange:function(e){return y(e.target.value)},required:!0}),o.a.createElement("input",{type:"submit",value:"Connect",onClick:function(e){return function(e){e.preventDefault(),h.a.post("https://".concat(v,"/api"),{devicetype:"YAHWA#user"}).then((function(e){if(e.data[0].error)101===e.data[0].error.type?x("Link button not pressed","red"):x("An error occured, please try again","red");else{var t=e.data[0].success.username;localStorage.setItem("hue-info","".concat(v,",").concat(t));var a="https://".concat(v,"/api/").concat(t);r(a),g(!0),x("Connection success!","green")}}))}(e)}})),o.a.createElement("p",null,"Make sure to press the link button on the Hue Bridge within 1 minute before pressing connect"),o.a.createElement("div",{className:"tooltip"},"How to find a Hue Bridge IP Address",o.a.createElement("span",{className:"tooltiptext"},"If the IP field isn't autofilled: 1. Open the Hue App and go settings/Hue Bridges 2. Find the Bridge you want to connect to and hit the i icon on the right hand side 3. Note the IP shown there, hit the pairing button on the Hue Bridge and click on connect."))),o.a.createElement(l.a,{basename:"/hue-lights"},o.a.createElement("div",{className:"no-show",id:"cover-div"}),o.a.createElement("header",null,o.a.createElement("nav",null,o.a.createElement("div",{className:"nav-wrapper"},o.a.createElement(l.b,{className:"brand-logo",to:"/"},"Hue App"),o.a.createElement("ul",{id:"nav-mobile",className:"right hide-on-med-and-down"},o.a.createElement("li",null,o.a.createElement(l.b,{to:"/lights"},"Lights")),o.a.createElement("li",null,o.a.createElement(l.b,{to:"/groups"},"Groups"))),O?o.a.createElement(i.a,{to:"/"}):""))),o.a.createElement("main",null,j,o.a.createElement(i.b,{exact:!0,path:"/",component:p}),o.a.createElement(i.b,{path:"/lights",render:function(){return o.a.createElement(E,{url:a,sendToast:x})}}),o.a.createElement(i.b,{path:"/groups",render:function(){return o.a.createElement(w,{url:a,sendToast:x})}})))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[109,1,2]]]);
//# sourceMappingURL=main.ccd5dabf.chunk.js.map