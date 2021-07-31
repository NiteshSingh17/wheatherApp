import React, { useEffect, useState } from 'react';


import Logo from './components/Logo';
import TodayWheather from './components/TodayWheather';
import Error from './components/Error';
import Circlemeter from './components/Circlemeter';
import WindMeter from './components/WindMeter';
import Pressure from './components/Pressure';
import FloodChance from './components/FloodChance';
import FrontChart from './components/FrontChart';
import SearchBar from './components/SearchBar';
import LeftNav from './components/LeftNav';

import { Link,useLocation,useHistory} from 'react-router-dom';

import axios from 'axios';
import {makechart,MONTHS} from './makechart.js';




function App(props) {
 

  let history = useHistory();
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

  let query = useQuery();
console.log("paaa ",query.get("ct"));


const [shownav,setShownav]=useState(false);
const [showrightnav,setShowrightnav]=useState(false);

const [pageError,setPageError]=useState('');

const [calender,setCalender]=useState('1999-01-01');


const [mode,setMode]=useState('light');

const [loading,setLoading]=useState(true);

const [country,setCountry]=useState();

const [city,setCity]=useState();


//2022 default for Recent wheather Forcast
//const [searDate,setSearDate]=useState(pdate);

const [date,setDate]=useState('');

const [condition,setCondition]=useState('');

const [celc,setCelc]=useState('');

const [chanceofrain,setChanceofrain]=useState('');

const [humidity,setHumidity]=useState('');
const [winddir,setWinddir]=useState('');

const [windspeed,setWindspeed]=useState(0);
const [pressure,setPressure]=useState(0);
const [soilMoisture,setSoilMoisture]=useState(0);
const [refresh,setRefresh]=useState(false);

function hideError(){
setPageError('');
}
function handleError(msg){
console.log(msg,msg.error);
setPageError(msg.message);
}

function refreshPage(){
setLoading(true);
setRefresh(pre=>!pre);
}

function setNewDate(e){
setCalender(e.target.value);
document.querySelector('.refreshNewbt').style.display="inline-block";
}


function refreshWithNewDate(){

const newda=calender.split('-');

//1999-February-18
const tempDate=newda[0]+"-"+MONTHS[parseInt(newda[1])-1]+"-"+parseInt(newda[2]);


let newquery="?date="+tempDate;

if(country){
newquery+="&cty="+country;
}
if(city){
newquery+="&cy="+city;
}
console.log("teda ",newda,tempDate,newquery);

    history.push(newquery);
refreshPage();


}


const hideSearchBar=()=>{setShownav(false)}

const changeshowrightnav=(val)=>{
setShowrightnav(val);
}

const ChangeMode=()=>{
if(mode=='light'){
setMode('dark');
}else{
setMode('light');
}
}
useEffect(()=>{
async function fetchdata(){
try{

let pdate=query.get("date")||"1999-February-18";
let dateForSearch=pdate.split('-');
let pcountry=query.get("cty")||"NG";

let pct=query.get("ct")||"Uyo";

console.log("in call",country,city)
let {data,status}=await axios.get(`https://wheather-api.herokuapp.com/getdata?country=${pcountry}&city=${pct}&year=${dateForSearch[0]}&month=${dateForSearch[1]}&day=${dateForSearch[2]}&eyear=${query.get("date")?dateForSearch[0]:"2022"}`);
console.log("d",data,status);
if(status===200){


data=data[0];
if(data){

setCountry(data.country);
setCity(data.city);

setCelc(data.Temperature);
let cday=data.day;
if(data.day<10){
cday="0"+cday;
}
let cmonth=data.Month+1;
if(data.Month<10){
cmonth="0"+cmonth;
}
const newcalenddate=data.year+"-"+cmonth+"-"+cday;
setCalender(newcalenddate);
const date=MONTHS[data.Month]+" "+data.day+", "+data.year;
setDate(date);
setCondition(data.Condition);
setChanceofrain(data.Chanceofrain);
setHumidity(data.Humidity)
setWinddir(data.winddir);
setWindspeed(data.Windspeed);
setPressure(data.Pressure);
setLoading(false);
}else{
handleError({message:"Sorry ,Currently enough Data is not present for this day."})
setLoading(false);
return;
}
}else{
handleError(data.msg);
setLoading(false);
return;
}

let res=await axios.get(`https://wheather-api.herokuapp.com/getdata?country=${pcountry}&city=${pct}&year=1999&month=${dateForSearch[1]}&day=${dateForSearch[2]}&eyear=${query.get("date")?dateForSearch[0]:"2022"}&limit=100`);
const graphData=res.data;
const graphStatus=res.status;

if(graphStatus===200){
const finaldata=[[...graphData]];
makechart(finaldata,graphData.day,graphData.Month,graphData.year,'Previous Days Temperature','myChart',true,"Temperature",'line');
}
else{
handleError(graphData.msg);

}

let cday=data.day;
if(data.day<10){
cday="0"+cday;
}
let cmonth=data.Month+1;
if(data.Month<10){
cmonth="0"+cmonth;
}
const dateForSoil=data.year+"-"+cmonth+"-"+cday;

let soilRes=await axios.get(`https://wheather-api.herokuapp.com/soilMoisture?cnt=${pcountry}&ct=${pct}&date=${dateForSoil}`);
const soilData=soilRes.data;
const soilStatus=soilRes.status;

if(soilStatus===200){
console.log("soil ",soilData);
setSoilMoisture(parseFloat(soilData));
}
else{
handleError(soilData.msg);
}




}catch(err){console.log("error",err);handleError(err);setLoading(false);
}
}

fetchdata();
},[refresh]);

//console.log(winddir);

  return (
  
<section>
<script src="https://www.chartjs.org/samples/2.9.4/utils.js" ></script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<section style={{"transition":"background 3s","display":"flex","background":(mode=='light'?"transparent":"rgba(0,0,0,0.8)")}}>


<section id="maincon" style={{"flexGrow":"1"}}>
{pageError?<Error error={pageError} hideError={hideError} />:""}

<span id="modeContainer"><span onClick={ChangeMode} style={{"width":(mode=="light"?"":"0px")}}></span><span onClick={ChangeMode} id="dark" style={{"width":(mode=="light"?"0px":"")}}></span></span>
<section className="loadingContainer">
<span id="leftload" style={{"left":(loading===true?"0px":"-60%")}}><Logo /></span>
<span id="rightload" style={{"right":(loading?"0px":"-60%")}}></span>
</section>

<section style={{"maxHeight":(loading?"100vh":""),"overflow":(loading?"hidden":"")}}>

{!shownav?<div id="rightsearchbt" onClick={()=>setShownav(true)}><img src="./images/search.svg"/></div>:""}

<TodayWheather celc={celc} condition={condition} country={country} city={city} date={date}/>
<section style={{"display": "flex","flexWrap": "wrap","justifyContent": "center","position":"relative"}}>
<div className="curdatecon"><input id="todayDate" type="date" value={calender} onChange={(e)=>{setNewDate(e)}}></input><span onClick={refreshWithNewDate} className="refreshNewbt"><img src="./images/refresh.svg"/></span></div>
<Circlemeter title="Chance of Rain" val={chanceofrain+"%"} date={date}/>
<Circlemeter title="Humidity" val={humidity+"%"} date={date}/>
<WindMeter dir={winddir} speed={windspeed}/>
<Pressure val={pressure} date={date}/>
</section>
<FloodChance soilMoisture={soilMoisture} date={date}/>
<FrontChart changeshowrightnav={changeshowrightnav}/>
</section>


<div class="translatecon" onClick={()=>{
console.log("click")
document.querySelector('#google_translate_element').style.display="block";document.querySelector('.translatetext').style.display="none";

document.querySelector('.translatecon').style.background="transparent";

}}>
<div id="google_translate_element"></div>
<p class="translatetext" >Change Language</p>
</div>
</section>
<section id="uppersearch">
<SearchBar shownav={shownav} setShownav={hideSearchBar} refreshPage={refreshPage}/>

</section>
</section>

<LeftNav changeshowrightnav={changeshowrightnav} showrightnav={showrightnav}/>

</section>  );
}



export default App;
