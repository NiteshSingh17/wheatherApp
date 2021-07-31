import React from 'react';



function FloodChance(params) {
 
const floodchance=params.soilMoisture<0.33?"Low":params.soilMoisture<0.66?"Average":"High";

return (<div id="flodecon">

<div className="detail"><img alt="Flood" src="./images/flood.svg"/>{params.date+" Moisture is "+params.soilMoisture+", Flood Chances are "+floodchance}</div>
<p>Soilmoisture</p>
<div id="soilmoist"><div id="soilmeterline" style={{"width":(params.soilMoisture*650+"px")}}></div><span id="soilperc">{params.soilMoisture} </span></div>

<p>Flood Risk</p>
<div id="floodrisk">
<div id="floodmeterline"  style={{"width":(params.soilMoisture<0.33?"214px":params.soilMoisture<0.66?"429px":"650px")}}></div><span id="floodperc">{floodchance}</span>
</div>
</div>
);
}

export default FloodChance;
