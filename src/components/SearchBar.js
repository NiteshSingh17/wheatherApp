import React, { useEffect, useState } from 'react';


import { Link } from 'react-router-dom';



function SearchBar(params){

function newCity(){
setSearchCity('');
setAvlCity([]);
params.refreshPage();
}

const [searchCity,setSearchCity]=useState('');
const allCity=['NG-Uyo','GH-Accra'];
const [avlCity,setAvlCity]=useState([]);
console.log("av",avlCity);
let res=avlCity.map((one)=>{console.log('ma ',one);return <span key={one} onClick={(e)=>{handleSearch(e)}}>  <Link onClick={newCity} to={"?cty="+one.split('-',)[0]+"&ct="+one.split('-')[1]}>{one.replaceAll('-',', ')}</Link></span>;})


const handleSearch=(e)=>{
console.log(e.target);
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


return(
<section id="searchcon" style={{"width":(params.shownav?"240px":"")} }>

{params.shownav?<h1 onClick={params.setShownav}><img alt="search" src="./images/cross.svg"/></h1>:""}
<div style={{"position":"absolute","bottom":"15px","left":"20px"}}>
<div id="rightSearchItem">
{res.length>0?res:searchCity!==''?"No results found :(":""}
</div>
<input id="searchinp" placeholder="search Uyo" value={searchCity} onChange={(e)=>{
setSearchCity(e.target.value);
}}/>
<img id="searchphoto"src="./images/search.svg"/>
</div>
</section>);
}


export default SearchBar;