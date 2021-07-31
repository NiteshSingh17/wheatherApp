import React from 'react';

function Error(props){
console.log("errop",props);

return (<div className="errorCont"><p class="error">
{props.error}</p>
<div className="errorbt" onClick={()=>{props.hideError()}}>OK</div></div>);}

export default Error;