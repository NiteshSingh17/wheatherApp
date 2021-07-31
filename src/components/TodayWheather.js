import React from 'react';




function TodayWheather(params) {
 
console.log("pa ",params); 
 return (

<section id="weathershow">
<div>
<div id="weatherimg">
{params.condition?<img alt="Wheather" src={"/images/"+params.condition.replaceAll(' ','-').toLowerCase()+".svg"}/>:""}
</div>
<div id="Temperature">
<ul>
<li id="celcius">{params.celc?(params.celc).toString().substring(0,4)+" C":""}</li>
<li id="forh">{params.celc?(((params.celc*9/5)+32).toString().substring(0,4)+" F"):""}</li></ul>
<span>Condition: {params.condition}</span>
</div>
</div>
<div id="datecon">
<span id="ctyname">{params.country?(params.country+", "+params.city):""}</span>

<span id="curdate">{params.date}</span>
</div>
</section>
 );
}



export default TodayWheather;
