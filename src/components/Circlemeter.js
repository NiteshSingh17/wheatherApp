import React from 'react';




function Circlemeter(params) {

let per=0;
let style={}
if(params.val.length>1){
per=parseInt(params.val.substring(0,params.val.length-1));
per=per/200;
style={"transform":"rotate("+per+"turn)"}
}
return (

<div className="contup">
<div className="detail">
<img alt="Image" src={"./images/"+params.title.toLowerCase().replaceAll(" ","-")+".svg"}/>{params.date+" "+params.title+" is "+params.val}</div>
<div className="container">
  <div className="gauge-b"></div>
  <div className="gauge-c" style={style}></div>
  <div className="gauge-data">
    <h1 id="percent">{params.val}</h1>
  </div>
</div>
<div className="continfo">
{params.title}

</div>
</div>
);

 }




export default Circlemeter;
