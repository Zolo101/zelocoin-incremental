import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIA from "./achievements"; // Zelo Incremental Achievements File

export var zinc = new Decimal(0); //1% coin boost
export var zirconium = new Decimal(0); //currency for prestige shop

export var zincPotential = new Decimal(0); // UpdateGains();
export var zirconiumPotential = new Decimal(0); // UpdateGains();

export var layerUpButtonCost = new Decimal(2); // UpdateLayerUpButton();

//export var zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
//export var zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();

export var shopbuttons = []; // to be used soon

let prestigeButton = document.createElement("button");
prestigeButton.onclick = function(){Prestige()};
document.getElementById("prestige").appendChild(prestigeButton);
prestigeButton.id = "prestigebutton";
prestigeButton.innerHTML = "Prestige";

let br = document.createElement("br");
document.getElementById("other").appendChild(br); //bruh

let layerUpButton = document.createElement("button");
layerUpButton.onclick = function(){UpdateLayerUpButton()};
document.getElementById("prestige").appendChild(layerUpButton);
layerUpButton.id = "layerupbutton";
layerUpButton.innerHTML = "Increase Max Layer for<br> 2 Zirconium";

var zincelement = document.getElementById("zinc");
var zirconiumelement = document.getElementById("zirconium");

export function Prestige() {
	if (window.confirm("Are you sure you want to Prestige? You will lose your zelocoins & layers.")) {
		zinc = zinc.plus(zincPotential);
		zirconium = zirconium.plus(zirconiumPotential);

		zincPotential = zincPotential.minus(zincPotential);
		zirconiumPotential = zirconiumPotential.minus(zirconiumPotential);
		ZIC.CoinBoost(zinc);
		//console.log(ZIC.coinboost);
		ZIC.PrestigeReset();
		console.log("Prestige'd");
		UpdatePrestigeElements();
	}
}

export function UpdateGains() {
	let zinc_zero = ZIC.DecimalFormat(zincPotential) ? ZIC.scientific.format(zincPotential,2,0) : zincPotential.toNumber();
	let zirconium_zero = ZIC.DecimalFormat(zirconiumPotential) ? ZIC.scientific.format(zirconiumPotential,2,0) : zirconiumPotential.toNumber();
	let zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
	let zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();
	zincPotential = zincPotential.minus(zincPotential);
	zirconiumPotential = zirconiumPotential.minus(zirconiumPotential);

	zincPotential = zincPotential.add(ZIC.zelocoin).dividedBy(1e+10).floor();
	zirconiumPotential = zirconiumPotential.add(ZIC.ps).dividedBy(1e+8).floor();

	zincelement.innerHTML = zinc_format + " Zinc (+" + zinc_zero + ")"; 
	zirconiumelement.innerHTML = zirconium_format + " Zirconium (+" + zirconium_zero + ")"; 
}

export function UpdatePrestigeElements() {
	let zinc_zero = ZIC.DecimalFormat(zincPotential) ? ZIC.scientific.format(zincPotential,2,0) : zincPotential.toNumber();
	let zirconium_zero = ZIC.DecimalFormat(zirconiumPotential) ? ZIC.scientific.format(zirconiumPotential,2,0) : zirconiumPotential.toNumber();
	let zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
	let zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();
	// repeated variables...
	zincelement.innerHTML = zinc_format + " Zinc (+" + zinc_zero + ")"; 
	zirconiumelement.innerHTML = zirconium_format + " Zirconium (+" + zirconium_zero + ")"; 
	//console.log(zinc_format);
	//console.log(zirconium_format);
}

export function UpdateLayerUpButton() {
	let layerupbuttoncost_format = ZIC.DecimalFormat(layerUpButtonCost) ? ZIC.scientific.format(layerUpButtonCost,2,0) : layerUpButtonCost.toNumber();
	if (zirconium.greaterThanOrEqualTo(layerUpButtonCost)) {
		zirconium = zirconium.minus(layerUpButtonCost);
		layerUpButtonCost = layerUpButtonCost.times(layerUpButtonCost);
		//console.log(layerUpButtonCost.toNumber());
		ZIC.MaxLevelChange(1);
		layerupbuttoncost_format = ZIC.DecimalFormat(layerUpButtonCost) ? ZIC.scientific.format(layerUpButtonCost,2,0) : layerUpButtonCost.toNumber();
		layerUpButton.innerHTML = "Increase Max Layer for<br>" + layerupbuttoncost_format + " Zirconium";
		UpdatePrestigeElements();
	}
}

export function LocalStoragePrestige() {
	zinc = new Decimal(localStorage.getItem("zinc"));
	zirconium = new Decimal(localStorage.getItem("zirconium"));
}