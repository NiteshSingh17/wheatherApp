import React, { useEffect, useState } from 'react';



function Pressure(params) {
 
const wid=params.val-975;
return (
<div className="contup">

<div className="detail"><img src="./images/pressure.svg" />{params.date+" Pressure is "+params.val}</div>
<h3>Pressure</h3>
<div className="slideup"><p style={{"width":(wid>10?wid:10),"background":(wid<45?"aquamarine":wid<60?"#f0e01e":"#bbza507")}}></p></div>
<h5>{params.val+"mb"}</h5>
</div>

);
}

export default Pressure;