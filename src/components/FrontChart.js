import React from 'react';



function FrontChart(params){

return (
<section style={{"position":"relative","maxWidth":"750px","margin":"2rem auto","width":"fit-content"}}>

<div id="compbt" onClick={()=>{params.changeshowrightnav(true)}}><img src="./images/compare.svg"/> Compare</div>
<canvas id="myChart"></canvas>

</section>
);}

export default FrontChart;