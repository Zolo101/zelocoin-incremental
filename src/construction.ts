import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

import * as ZIA from "./achievements"; // Zelo Incremental Achievements File
import * as ZIP from "./prestige"; // Zelo Incremental Prestige File
export const scientific = new ADNotations.ScientificNotation();

export var layers = [];
export var zelocoin = new Decimal(2); 
export var ps = new Decimal(0);
export var buffer = new Decimal(0);
export var VERSION = "1.2";
export var SAVEVERSION = "1.0";

export var coinboost = new Decimal(1);
export var maxlayer = new Decimal(5);

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

export function LayerCheck(linfo: LayerInfo) {
	if (layers[linfo.id] == null && !maxlayer.greaterThanOrEqualTo(layers.length)) {
		window.alert("(temporary message) You've reached the max layer! Prestige to gain Zinc/Zirconium which will allow you to up the max layer limit.");
		return;
	}
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

		localStorage.setItem("coinboost",coinboost);
		localStorage.setItem("maxlayer",maxlayer);

		localStorage.setItem("zinc",ZIP.zinc);
		localStorage.setItem("zirconium",ZIP.zirconium);

		localStorage.setItem("achievements",JSON.stringify(ZIA.achievements));
		//console.log(ZIA.achievements);
		localStorage.setItem("completedAchievements",JSON.stringify(ZIA.completedAchievements));
		localStorage.setItem("theme",document.body.getAttribute("theme"));	
		localStorage.setItem("version",SAVEVERSION); // remember to change this each version	
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

		coinboost = new Decimal(localStorage.getItem("coinboost"));
		maxlayer = new Decimal(localStorage.getItem("maxlayer"));

		ZIP.LocalStoragePrestige();
		ZIA.ChangeAchievements(ZIA.achievements,JSON.parse(localStorage.getItem("achievements")));
		ZIA.ChangeAchievements(ZIA.completedAchievements,JSON.parse(localStorage.getItem("completedAchievements")));
		//console.log(ZIA.achievements);
		//console.log(JSON.parse(localStorage.getItem("achievements")));

		if (localStorage.getItem("theme") != "light") {
			document.getElementById("css").setAttribute("rel","stylesheet");
			document.getElementById("css").setAttribute("href","../lib/css/themes/" + localStorage.getItem("theme") + ".css");
		}

		document.getElementById("achievementbutton").innerHTML = "Achievements " + ZIA.completedAchievements.length + "/" + ZIA.achievements.length;
		UpdateZelocoins();
		if (localStorage.getItem("version") != SAVEVERSION) {
			window.alert("The save-version your save is on is '" + localStorage.getItem("version") + "'although the current save-version is '" + SAVEVERSION + "'. Things may/may not work in your save. (for example newly updated achievements wont be in your save.) In the future, to potentially fix this, press the save button to update the save-version.");
		}
		if (!ZIA.achievements[3].achieved) { // keep an eye out for this
			ZIA.achievements[3].achieved = true;
			console.log(ZIA.achievements[3].achieved);
			ZIA.AchievementCheck();
		}
	}
}

export function Tick() {
	ps = ps.minus(ps);
	for (var i = layers.length-1; i >= 0; i--) {
		let flinfo = layers[i].linfo;
		buffer = buffer.plus(flinfo.amount).times(coinboost);
		//buffer = buffer.times(flinfo.amount**10); //quick and fast numbers, for debugging
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
	let clinfo = (DecimalFormat(linfo.cost)) ? scientific.format(linfo.cost,2,0) : linfo.cost.toNumber();
	let alinfo = (DecimalFormat(linfo.amount)) ? scientific.format(linfo.amount,2,0) : linfo.amount.toNumber();
	document.getElementById("layer"+linfo.id).innerHTML = "<b>" + alinfo + "</b><br>Layer " + linfo.id + "<br>" + clinfo + " Zelocoin";
}

export function UpdateZelocoins() {
	if (DecimalFormat(zelocoin)) {
		document.getElementById("coin").innerHTML = scientific.format(zelocoin,2,0) + " zelocoins";
	} else {
		document.getElementById("coin").innerHTML = zelocoin.toNumber() + " zelocoins";
	}
	if (DecimalFormat(ps)) {
		document.getElementById("ps").innerHTML = "You are making " + scientific.format(ps,2,0) + " (" + Decimal.div(ps,zelocoin).times(100).toNumber().toFixed(2) +"%) zelocoins.";
	} else {
		document.getElementById("ps").innerHTML = "You are making " + ps.toString()  + " (" + Decimal.div(ps,zelocoin).times(100).toNumber().toFixed(2) +"%) zelocoins.";
	}
}

export function DecimalFormat(decimal: Decimal) {
	if(decimal.greaterThanOrEqualTo(scientificwhen)) {
		return true;
	} else {return false};
}

export function PrestigeReset() { // this shouldn't be a function
	zelocoin = zelocoin.minus(zelocoin).add(2);
	ps = ps.minus(ps);
	layers = [];
	document.getElementById("layer").innerHTML = "";
	layers[0] = new Layer({id:1,cost: new Decimal(2),amount: new Decimal(0)});
}

export function CoinBoost(decimal: Decimal) { // or this
	coinboost = coinboost.plus(decimal);
}

export function MaxLevelChange(decimal: Decimal) { // or this
	maxlayer = maxlayer.plus(decimal);
}