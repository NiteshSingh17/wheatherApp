console.log('okwk');
var MONTHS = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];


window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

(function(global) {
//console.log(window);

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];
global=window;
	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;
window.Samples=Samples;
	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = MONTHS[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// DEPRECATED
	window.randomScalingFactor = function() {
		return Math.round(Samples.utils.rand(-100, 100));
	};

	// INITIALIZATION

	Samples.utils.srand(Date.now());

	// Google Analytics
	/* eslint-disable */
	if (document.location.hostname.match(/^(www\.)?chartjs\.org$/)) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-28909194-3', 'auto');
		ga('send', 'pageview');
	}

}(this));


function sortdata(o) {
console.log(o);
return Object. keys(o). sort(). reduce((r, k) => (r[k] = o[k], r), {});
}


function makechart(chartdata,curday,curmonth,curyear,chartName,chartId,chartYMin,by,charttype){

chartdata.forEach(one=>one.reverse());
console.log("chda ",chartdata);
const Utils=Samples.utils;
if(window[chartName]){
window[chartName].destroy();
}

var ctx = document.getElementById(chartId).getContext('2d');

// <block:setup:2>

const generateLabels = () => {
let labels=new Map();

chartdata.forEach(chone=>{
chone.forEach((one)=>{
let mylabel=one.day+"-"+MONTHS[one.Month].substring(0,3)+"-"+one.year.toString().substring(2);
labels[one.id]=mylabel.toString();
})
})

let keys = Object.keys(labels),
  i, len = keys.length;

keys.sort();
let resval=[];


console.log("lab ",labels,keys,len);
for (i = 0; i < len; i++) {
  k = parseInt(keys[i]);
  console.log(k + ':' + labels[k]);
resval.push(labels[k]);
}

console.log("rs ",resval);
return resval;
};

Utils.srand(3);

const generateData = (onedataset) =>{

let data=[];
onedataset.forEach(one=>{
let onepoint={};



let mylabel=one.day+"-"+MONTHS[one.Month].substring(0,3)+"-"+one.year.toString().substring(2);


onepoint['x']=mylabel;
onepoint['y']=one[by]
data.push(onepoint);
})

console.log("labels ",data);
return data;
};

const al=(co)=>{
console.log(co);
return (`rgba(${co},0.5)`);
}

//const givendata=generateData();
const givenlabel= generateLabels();
//console.log("giv",givendata,givenlabel);


const findaldataset=[];
let cur=0;
chartdata.forEach((one)=>{
let onedataset={};
//console.log("ad ",cur,one);
let name="datset "+cur;
if(one.length>0){
name=one[0].country+", "+one[0].city;
}
onedataset.label=name;
onedataset.data=generateData(one);
let bgcolor=Math.random()*1000%255+","+Math.random()*1000%255+","+Math.random()*1000%255+",0.8";

if(charttype==='tranLine'){
onedataset.backgroundColor="transparent";}
else{
onedataset.backgroundColor="rgba("+bgcolor+")";
}
onedataset.borderColor="rgba("+bgcolor+")";
onedataset.fill=true;
findaldataset.push(onedataset);
cur++;
})

console.log(findaldataset)
const data = {
  
labels:givenlabel,
  datasets: findaldataset
};
// </block:data>

// <block:actions:3>
let smooth = false;
if(charttype==='tranLine'){
charttype='line'
}

/*

const actions = [
  {
    name: 'drawTime: beforeDatasetDraw (default)',
    handler: (chart) => {
      chart.options.plugins.filler.drawTime = 'beforeDatasetDraw';
      chart.update();
    }
  },
  {
    name: 'drawTime: beforeDatasetsDraw',
    handler: (chart) => {
      chart.options.plugins.filler.drawTime = 'beforeDatasetsDraw';
      chart.update();
    }
  },
  {
    name: 'drawTime: beforeDraw',
    handler: (chart) => {
      chart.options.plugins.filler.drawTime = 'beforeDraw';
      chart.update();
    }
  },
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = generateData();
      });
      chart.update();
    }
  },
  {
    name: 'Smooth',
    handler(chart) {
      smooth = !smooth;
      chart.options.elements.line.tension = smooth ? 0.4 : 0;
      chart.update();
    }
  }
];*/
// </block:actions>

// <block:config:1>
// </block:actions>

// <block:config:1>
const config = {
  type:charttype,
  data: data
,
  options: {
    scales: {
        y: {
            beginAtZero: chartYMin
        }
    },
    plugins: {
      filler: {
        propagate: false,
      },
      title: {
        display: true,
        text: chartName
      }
    },
    pointBackgroundColor: '#fff',
    radius: 10,
    interaction: {
      intersect: false,
    }
  },
};
// </block:config>

var myChart = new Chart(ctx,config);


window[chartName]=myChart;
}
const chartdata=[[{
Chanceofrain: 80,
Condition: "Cloudy",
Humidity: 77,
Month: 1,
Pressure: 1000.7,
Temperature: 29.5,
Windspeed: 5,
city: "Uyo",
country: "NG",
day: 18,
id: 20210118,
winddir: "wsw",
year: 2021},
{
Chanceofrain: 20,
Condition: "Cloudy",
Humidity: 57,
Month: 0,
Pressure: 999.3,
Temperature: 34.7,
Windspeed: "Unknown",
city: "Uyo",
country: "NG",
day: 7,
id: 20210107,
winddir: "Unknown",
year: 2021},
{Chanceofrain: 20,
Condition: "Sunny",
Humidity: 60,
Month: 2,
Pressure: 998.2,
Temperature: 34.9,
Windspeed: 15,
city: "Uyo",
country: "NG",
day: 9,
id: 20200209,
winddir: "NE",
year: 2020}],[{
Chanceofrain: 80,
Condition: "Cloudy",
Humidity: 77,
Month: 1,
Pressure: 1000.7,
Temperature: 26.5,
Windspeed: 5,
city: "Uyo",
country: "NG",
day: 18,
id: 20210118,
winddir: "wsw",
year: 2021},
{
Chanceofrain: 20,
Condition: "Cloudy",
Humidity: 57,
Month: 0,
Pressure: 999.3,
Temperature: 44.7,
Windspeed: "Unknown",
city: "Uyo",
country: "NG",
day: 7,
id: 20210107,
winddir: "Unknown",
year: 2021},
{Chanceofrain: 20,
Condition: "Sunny",
Humidity: 60,
Month: 2,
Pressure: 998.2,
Temperature: 14.9,
Windspeed: 15,
city: "Uyo",
country: "NG",
day: 9,
id: 20200209,
winddir: "NE",
year: 2019}]]

//

module.exports={makechart,
MONTHS}