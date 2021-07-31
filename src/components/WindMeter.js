import React from 'react';


function WindMeter(params) {

let rote='-1';

function getangle(){

if(params.dir){
const dir=params.dir.toLowerCase();

switch(dir){
case 'wnw':{rote="22.5";break;}
case 'nw':{rote="45";break;}
case 'nnw':{rote="67.5";break;}
case 'n':{rote="90";break;}
case 'nne':{rote="112.5";break;}
case 'ne':{rote="135";break;}
case 'ene':{rote="157.5";break;}
case 'e':{rote="180";break;}
case 'ese':{rote="-157.5";break;}
case 'se':{rote="-135";break;}
case 'sse':{rote="-112.5";break;}
case 's':{rote="-90";break;}
case 'ssw':{rote="-67.5";break;}
case 'sw':{rote="-45";break;}
case 'wsw':{rote="-22.5";break;}
case 'w':{rote="0";break;}
defalut :{rote="-1";}
}
}
return rote;
}

const angle=getangle();
//console.log("ab ",angle);
let style={};
if(angle!=='-1'){
style={"transform": "rotate("+angle+"deg)"}
}else{
style={"width":"100%","left":"0","textAlign":"center"}
}

return (

<div className="contup">

<div className="detail">
<img alt="Wind" src="./images/air.svg"/>{params.date+" wind at "+params.dir+",Wind Speed is "+(params.speed>5?"Good":"Bad")+"."}</div>
<div id="winddir">
<span id="north">N</span>
<span id="east">E</span>
<span id="west">W</span>
<span id="south">S</span>
<p>{angle!=='-1'?"Wind Speed "+params.speed+" km/h":"Not Available"}</p>
<span id="windniddle" style={style}>{angle!='-1'?<img src="./images/arrow.svg"/>:""}


</span>
</div>
</div>

);
}


export default WindMeter;
