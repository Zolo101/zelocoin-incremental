import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

import * as ZIA from "./achievements"; // Zelo Incremental Achievements File
const scientific = new ADNotations.ScientificNotation();

export var layers = [];
export var zelocoin = new Decimal(2);
export var money = new Decimal(0);
export var ps = new Decimal(0);
export var buffer = new Decimal(0);
export var VERSION = "1.1.2";

export var scientificwhen = new Decimal(1e+5);

export class Layer {
	constructor(public linfo: LayerInfo) {
		let layerbutton = document.createElement("button");
		document.getElementById("layer").appendChild(layerbutton);
		layerbutton.id = "layer" + linfo.id;
		layerbutton.innerHTML = "<b>" + linfo.amount + "</b><br>Layer " + linfo.id + "<br>" + linfo.cost + " Zelocoin";
		layerbutton.onclick = function(){LayerCheck(linfo)};
	}
}

layers[0] = new Layer({id:1,cost: new Decimal(2),amount: new Decimal(0)});
layers[1] = new Layer({id:2,cost: new Decimal(100),amount: new Decimal(0)});

export function LayerCheck(linfo: LayerInfo) {
	if (zelocoin.greaterThanOrEqualTo(linfo.cost)) {
		zelocoin = zelocoin.minus(linfo.cost);
		linfo.amount = linfo.amount.plus(1);
		linfo.amount.toNumber();
		linfo.cost = linfo.cost.times(2);
		if (layers[linfo.id] == null) {
			layers[linfo.id] = new Layer({id:linfo.id+1,cost: new Decimal(("1e+" + Number(linfo.id*2)).toString()),amount:new Decimal(0)});
		}
		UpdateLayer(linfo);
		UpdateZelocoins();
	}
}

export interface LayerInfo {
	id: number;
	cost: any;
	amount: any;
}

export function Save() {
	if (window.confirm("Are you sure you want to save?")) { 
		localStorage.setItem("layers",JSON.stringify(layers));
		localStorage.setItem("zelocoin",zelocoin);
		localStorage.setItem("ps",ps);
		localStorage.setItem("achievements",JSON.stringify(ZIA.achievements));
		//console.log(ZIA.achievements);
		localStorage.setItem("completedAchievements",JSON.stringify(ZIA.completedAchievements));
		localStorage.setItem("theme",document.body.getAttribute("theme"));	
		localStorage.setItem("version",VERSION); // remember to change this each version	
	}
}

export function Load() {
	if (window.confirm("Are you sure you want to load?")) { 
		document.getElementById("layer").innerHTML = "";
		layers = JSON.parse(localStorage.getItem("layers"));
		for (var i = 0; i < layers.length; ++i) {
			layers[i].linfo.amount = new Decimal(layers[i].linfo.amount);
			layers[i].linfo.cost = new Decimal(layers[i].linfo.cost);
			if (document.getElementById("layer"+layers[i].linfo.id) == null) {
				layers[i] = new Layer({id:layers[i].linfo.id,cost: new Decimal(layers[i].linfo.cost),amount:new Decimal(layers[i].linfo.amount)});
				//console.log(layers[i].linfo);
			}
		}
		zelocoin = new Decimal(localStorage.getItem("zelocoin"));
		ps = new Decimal(localStorage.getItem("ps"));
		ZIA.ChangeAchievements(ZIA.achievements,JSON.parse(localStorage.getItem("achievements")));
		ZIA.ChangeAchievements(ZIA.completedAchievements,JSON.parse(localStorage.getItem("completedAchievements")));
		//console.log(ZIA.achievements);
		//console.log(JSON.parse(localStorage.getItem("achievements")));
		document.body.setAttribute("theme",localStorage.getItem("theme"));
		document.getElementById("achievementbutton").innerHTML = "Achievements " + ZIA.completedAchievements.length + "/" + ZIA.achievements.length;
		UpdateZelocoins();
		if (localStorage.getItem("version") != VERSION) {
			window.alert("Just to let you know, this save is from version " + localStorage.getItem("version") + " so some things may/may not work. To fix this, you can press the save button to update your save to the correct version.")
		}
		// console.log(ZIA.achievement7.ainfo.achieved);
		// if (!ZIA.achievement7.ainfo.achieved) {
		// 	ZIA.achievement7.ainfo.achieved = true;
		// 	console.log(ZIA.achievement7.ainfo.achieved);
		// }
	}
}

export function Tick() {
	ps = ps.minus(ps);
	for (var i = layers.length-1; i >= 0; i--) {
		let flinfo = layers[i].linfo;
		buffer = buffer.add(flinfo.amount);//times(flinfo.amount);
		//buffer = buffer.times(flinfo.amount); //quick and fast numbers, for debugging
		if (i != layers.length-1) {
			//console.log(layers[i+1]);
			flinfo.amount = flinfo.amount.plus(layers[i+1].linfo.amount);
		}
		UpdateLayer(flinfo);
	}
	// console.log(buffer);
	// console.log(layers);
	ps = ps.plus(buffer);
	zelocoin = zelocoin.plus(ps);
	UpdateZelocoins();
	buffer = buffer.minus(buffer);
}

export function UpdateLayer(linfo: LayerInfo) {
	if (linfo.cost.greaterThanOrEqualTo(scientificwhen)) {
		document.getElementById("layer"+linfo.id).innerHTML = "<b>" + scientific.format(linfo.amount,2,0) + "</b><br>Layer " + linfo.id + "<br>" + scientific.format(linfo.cost,2,0) + " Zelocoin";
	} else {
		document.getElementById("layer"+linfo.id).innerHTML = "<b>" + linfo.amount.toString() + "</b><br>Layer " + linfo.id + "<br>" + linfo.cost.toNumber() + " Zelocoin";
	}
}

export function UpdateZelocoins() {
	if (zelocoin.greaterThanOrEqualTo(scientificwhen)) {
		document.getElementById("coin").innerHTML = scientific.format(zelocoin,2,0) + " zelocoins";
	} else {
		document.getElementById("coin").innerHTML = zelocoin.toNumber() + " zelocoins";
	}
	if (ps.greaterThanOrEqualTo(scientificwhen)) {
		document.getElementById("ps").innerHTML = "You are making " + scientific.format(ps,2,0) + " (" + Decimal.div(ps,zelocoin).times(100).toNumber().toFixed(2) +"%) zelocoins.";
	} else {
		document.getElementById("ps").innerHTML = "You are making " + ps.toString()  + " (" + Decimal.div(ps,zelocoin).times(100).toNumber().toFixed(2) +"%) zelocoins.";
	}
}