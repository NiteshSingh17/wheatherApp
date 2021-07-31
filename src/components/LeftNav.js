import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {makechart,MONTHS} from '../makechart.js';


function LeftNav(params){

const [searchCity,setSearchCity]=useState('');
const [allCity,setAllCity]=useState(['NG-Uyo','GH-Accra']);
const [avlCity,setAvlCity]=useState([]);
const [curCity,setCurCity]=useState([]);
const [inputShow,setInputShow]=useState(false);
const [dataset,setDataset]=useState([]);
const [refreshChart,setRefreshChart]=useState(false);

let searchResCity=avlCity.map((one)=>{
return <span key={one} onClick={(e)=>{handleSearch(e)}}>{one.replaceAll('-',', ')}</span>;})

let res=curCity.map((one)=>{
return (<li key={one}>{one}<span ><img src="./images/cross.svg" data-id={one} onClick={(e)=>{removeElement(e)}}/></span></li>)})


const handleSearch=(e)=>{
const newct=e.target.innerText;
let allct=[...curCity];

if(allct.includes(newct)){
return;
}

allct=[...curCity,newct];
setCurCity(allct);
setAvlCity([]);
setInputShow(false);

const ct=e.target.innerText.split(", ")[1];
const cnt=e.target.innerText.split(", ")[0];
callandupdate(cnt,ct)
}

function refChart(){
setDataset([]);
const newval=!refreshChart;
setRefreshChart(newval);
}


useEffect(()=>{
let newdata=[];
const len=curCity.length;
let current=0;
curCity.forEach(one=>{
current=current+1;
const ct=one.split(", ")[1];
const cnt=one.split(", ")[0];

const startday=document.querySelector('#startDay').value||"1999-01-01";
const endday=document.querySelector('#endDay').value||"2021-10-01";

const sd=removeFirstZero(startday.split('-')[2]);

const sm=MONTHS[parseInt(removeFirstZero(startday.split('-')[1]))-1];

const sy=startday.split('-')[0];

const ed=removeFirstZero(endday.split('-')[2]);
const em=MONTHS[parseInt(removeFirstZero(endday.split('-')[1]))-1];
const ey=endday.split('-')[0];

async function callfordata(){
let {data,status}=await axios.get(`https://wheather-api.herokuapp.com/getdata?country=${cnt}&city=${ct}&year=${sy}&month=${sm}&day=${sd}&eday=${ed}&emonth=${em}&eyear=${ey}&limit=100`);
console.log("d",data,status);

newdata=[...newdata,data];
console.log(newdata);
if(len===current){
console.log("setData");
setDataset(newdata);
}
}
callfordata();
})

},[refreshChart])



function callandupdate(cnt,ct){
const startday=document.querySelector('#startDay').value||"1999-01-01";
const endday=document.querySelector('#endDay').value||"2021-10-01";

const sd=removeFirstZero(startday.split('-')[2]);

const sm=MONTHS[parseInt(removeFirstZero(startday.split('-')[1]))-1];

const sy=startday.split('-')[0];

const ed=removeFirstZero(endday.split('-')[2]);
const em=MONTHS[parseInt(removeFirstZero(endday.split('-')[1]))-1];
const ey=endday.split('-')[0];

async function callfordata(){
let {data,status}=await axios.get(`https://wheather-api.herokuapp.com/getdata?country=${cnt}&city=${ct}&year=${sy}&month=${sm}&day=${sd}&eday=${ed}&emonth=${em}&eyear=${ey}&limit=100`);
console.log("d",data,status);

let allData=[...dataset,data];

setDataset(allData);

console.log("chdaall ",allData);
}
callfordata();
}



const updateChart=()=>{
const chartdata=[...dataset];
console.log("chda ",chartdata);
makechart(chartdata,18,1,2021,'Temperature Comparison','lineChart',true,'Temperature','line');

makechart(chartdata,18,1,2021,'Humidity Comparison','barChart',true,'Humidity','bar');

makechart(chartdata,18,1,2021,'Pressure Comparison','areaChart',false,'Pressure','tranLine');
}


useEffect(()=>{

updateChart();
},[dataset])


function removeFirstZero(val){
if(val[0]==='0'){
return val.substring(1);
}
return val;
}

const removeElement=(e)=>{

console.log(e.target.dataset,e.target);
const removeval=e.target.dataset.id;

deletefromdataset(removeval);


const allcurCity=[...curCity];

for(let i=0;i<allcurCity.length;i++){
console.log("ck ",i,allcurCity.length);
if(allcurCity[i]===removeval){
allcurCity.splice(i,1);
setCurCity(allcurCity);
console.log("remvecur ",i);
}
}
}

function deletefromdataset(removeval){
let dataSetVal=[...dataset];

for(let i=0;i<dataSetVal.length;i++){
console.log("dkk ",i,dataSetVal.length);
if(dataSetVal[i][0].country+", "+dataSetVal[i][0].city===removeval){
dataSetVal.splice(i,1);
setDataset(dataSetVal);
console.log("remve ",i);
break;
}}
}


useEffect(()=>{
const searchquery=searchCity.toLowerCase().replaceAll(' ','-');
if(searchquery!==''){
let newCt=[];
allCity.forEach((one)=>{
if(one.toLowerCase().indexOf(searchquery)>-1)
newCt.push(one);
})
setAvlCity(newCt);
}
},[searchCity]);


function seeDemo(){
const citys=['NG, Uyo'];
setCurCity(citys);
setDataset([]);
const newval=!refreshChart;
setRefreshChart(newval);
}




return (
<section id="leftnav" style={{"width":(params.showrightnav?"":"0px")}}>
<div style={{"background":"black"}}>
<div id="starttime">
<span>Start Time</span>
<span><input type="date" id="startDay"/></span></div>
<div id="endtime">
<span>End Time</span>
<span><input type="date" id="endDay"/></span></div>
<div id="refreshbt" onClick={refChart}><img src="./images/refresh.svg"/></div><span onClick={()=>{params.changeshowrightnav(false);}}><img src="./images/close.svg"/></span>
</div>
<div style={{"background":"rgba(255,255,255,0.5)"}}>
	<div id="citycontain"><ul>
<div class="undercity">
{res}
</div>
</ul>
<div>
<div id="btcon">
<div id="leftsearch">{searchResCity}</div><div id="upbtt">
<span id="plusbt" style={{"display":(inputShow?"none":"block")}}onClick={(e)=>{setInputShow(true);
document.querySelector('#addInput').focus();
}}><img src="./images/add.svg"/></span>
<input id="addInput" onChange={(e)=>{
setSearchCity(e.target.value);
}} style={{"display":(inputShow?"block":"none")}} placeholder="Search Uyo"/>
</div>
</div>
	</div>
<div onClick={seeDemo} id="demobt">See Example</div>
</div>
	<div id="graphscontain">

<canvas class="leftcanvas" id="lineChart"></canvas>
<canvas class="leftcanvas" id="barChart"></canvas>
<canvas class="leftcanvas" id="areaChart"></canvas>
</div>
</div>
</section>

);
}


export default LeftNav;