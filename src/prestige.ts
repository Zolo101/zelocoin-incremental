import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIA from "./achievements"; // Zelo Incremental Achievements File
import * as ZIM from "./script"; // Zelo Incremental Main File
import * as ZAL from "./alert"; // Zelo Alert File

import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

export var zincPotential = new Decimal(0); // UpdateGains();
export var zirconiumPotential = new Decimal(0); // UpdateGains();

export var layerUpButtonCost = new Decimal(4); // UpdateLayerUpButton();

//export var zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
//export var zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();

export class PSButton { // Prestige Shop Button
	constructor(public PSBInfo: PSBInfo) {
		PSBInfo.id = ZIC.pshopbuttons.length;
		ZIC.pshopbuttons.push(PSBInfo);
	}
}

export interface PSBInfo {
	name: string, // Name of the Item
	description: string, // Description of the Item
	function: any, // Triggered when the user buys the Item
	icon?: string, // Icon for the Item
	color?: string, // Color for the div
	cost: any, // Cost (MUST BE IN DECIMAL!!)
	costresource: any, // Resource for the cost
	open?: boolean // Is the Item Open currently?

	id?: number // manually enter it if you really want to 
}

export function LoadPrestigeCategory() {
	let prestigediv = new ZIC.Element({
		type: "div",
		id: "prestigediv",
		append: "layer",
	})

	let prestigetext = new ZIC.Element({
		type: "p",
		id: "prestigetext",
		append: "prestigediv",
		innerHTML: "By prestiging you will gain 0 Zinc."
	})

	let prestigebutton = new ZIC.Element({
		type: "button",
		id: "prestigedivbutton",
		append: "prestigediv",
		innerHTML: "Prestige!",
		onclick: function(){Prestige()},
	})

	document.getElementById("layer").appendChild(document.getElementById("prestigediv"));
}

export function LoadZincCategory() {
	let shopitemdiv = new ZIC.Element({
		type: "div",
		id: "pshop",
		append: "layer",
	})
	let shopitemhelp = new ZIC.Element({
		type: "h2",
		id: "pshophelp",
		append: "pshop",
		innerHTML: "Click to see the description of an item. (Shift-click an item to buy it)",
	})
	for (let i = 0; i < ZIC.pshopbuttons.length; i++) {
		let shopitem = new ZIC.Element({
			type: "div",
			id: "psdiv" + i, // prestige shop
			class: "psdiv",
			append: "pshop",
			onclick: function(){LoadPSItem(ZIC.pshopbuttons[i])},
		})
		let shopitemtitle = new ZIC.Element({
			type: "p",
			id: "psdivtitle" + i,
			class: "psdivtitle",
			append: "psdiv" + i,
			innerHTML: ZIC.pshopbuttons[i].name,
		})
		let shopitemcost = new ZIC.Element({
			type: "p",
			id: "psdivcost" + i,
			class: "psdivscost",
			append: "psdiv" + i,
			innerHTML: ZIC.df(ZIC.pshopbuttons[i].cost) + " Zinc", // + IC.pshopbuttons[i].costresource,
		})
		if (ZIC.pshopbuttons[i].color) {
			document.getElementById("psdiv" + i).style.backgroundColor = ZIC.pshopbuttons[i].color;
		}
	}
    // document.getElementById("pshop").style.backgroundColor = "#7a6f99";
	document.getElementById("layer").appendChild(document.getElementById("pshop"));
}

export function Prestige() {
	if (window.confirm("Are you sure you want to Prestige? You will lose your zelocoins & layers.")) {
		// console.log(ZIM.zirconium.ic.amount);
		ZIC.gamedata.resources.zinc = ZIC.gamedata.resources.zinc.plus(zincPotential);
		document.getElementById("zincsay").innerHTML = "You have " + ZIC.gamedata.resources.zinc + " zinc."
		// ZIM.zirconium.ic.amount = ZIM.zirconium.ic.amount.plus(zirconiumPotential);

		ZIC.gamedata.prestiges = ZIC.gamedata.prestiges.add(1);
		//zirconiumPotential = new Decimal(0);
		ZIC.CoinBoost(ZIC.gamedata.resources.zinc);
		//console.log(ZIC.coinboost);
		ZIC.PrestigeReset();
		if (!ZIA.achievements[5].achieved && zincPotential.gte(1)) { // Prestige achievement
			ZIA.achievements[5].achieved = true;
			console.log(ZIA.achievements[5].achieved);
			ZIA.AchievementCheck();
		}
		if (!ZIA.achievements[8].achieved) {
			if (ZIC.gamedata.prestiges.gte(5)) {
				ZIA.achievements[8].achieved = true;
				ZIA.AchievementCheck();
			}
		}
		zincPotential = new Decimal(0);
		console.log("Prestige'd");
		ZAL.CloseAlert();
		anime({
			targets: "#categoryprestige",
			backgroundColor: "rgb(46,139,87)",
			duration: 2000,
			direction: "alternate",
		})
   }
}

export function UpdateGains() {
	let zinc_zero = ZIC.df(zincPotential);
	let zirconium_zero = ZIC.df(zirconiumPotential);
	let zinc_format = ZIC.df(ZIC.gamedata.resources.zinc);
	// let zirconium_format = ZIC.df(ZIM.zirconium.ic.amount);
	zincPotential = new Decimal(0);
	// zirconiumPotential = new Decimal(0);

	if (ZIC.gamedata.zelocoin.e >= 10) {
		zincPotential = zincPotential.add(ZIC.gamedata.zelocoin.e-9).floor(); // dividedBy(1e+10)
	}
	// zirconiumPotential = zirconiumPotential.add(ZIC.gamedata.ps).dividedBy(1e+8).floor();
	if (document.getElementById("layer").getAttribute("category") == (ZIM.prestigecategoryalert.ainfo.categoryid)) {
		UpdatePrestigeElements();
	}
}

export function UpdatePrestigeElements() {
	document.getElementById("prestigetext").innerHTML = "By prestiging you will gain " + ZIC.df(zincPotential) + " Zinc.";
}

export function LoadPSItem(PSBI: PSBInfo) {
	let itemid = "psdiv" + PSBI.id;
	let item = document.getElementById(itemid);
	let itemtitle = document.getElementById("psdivtitle" + PSBI.id);
	let itemcost = document.getElementById("psdivcost" + PSBI.id);
	if (!PSBI.open) {
		if (ZIC.keys["16"]) {
			BuyPSBI(PSBI);
			return;
		}
		PSBI.open = true;
		//item.style.position = "absolute";
		item.style.width = "90%";
		item.style.height = "60%";

		itemtitle.style.fontSize = "calc(40px + 0.5vw)";
		itemcost.style.fontSize = "calc(25px + 0.5vw)";

		let psdivdescription = new ZIC.Element({
			type: "p",
			id: "psdivdesc" + PSBI.id,
			class: "psdivdesc",
			append: itemid,
			innerHTML: PSBI.description,
		})

		let psdivbuy = new ZIC.Element({
			type: "button",
			id: "psdivbutton" + PSBI.id,
			class: "psdivbutton",
			append: itemid,
			onclick: function(){
				//console.log(PSBI.costresource);
				//console.log(PSBI.cost);
				BuyPSBI(PSBI);
			},
			innerHTML: "Buy!",
		})
	} else {
		PSBI.open = false;
		document.getElementById("psdivdesc" + PSBI.id).remove();
		document.getElementById("psdivbutton" + PSBI.id).remove();
		itemcost.style.fontSize = "initial";
		itemtitle.style.fontSize = "initial";
		//item.style.position = "initial";
		item.style.width = "calc(96px + 1vw)";
		item.style.height = "calc(64px + 1vw)";
	}
}

export function BuyPSBI(PSBI: PSBInfo) {
	let itemid = "psdiv" + PSBI.id;
	let item = document.getElementById(itemid);
	let itemtitle = document.getElementById("psdivtitle" + PSBI.id);
	let itemcost = document.getElementById("psdivcost" + PSBI.id);
	if (ZIC.gamedata.resources.zinc.gte(PSBI.cost)) { // hardcoded zinc is temporary
		ZIC.gamedata.resources.zinc = ZIC.gamedata.resources.zinc.minus(PSBI.cost);
		document.getElementById("zincsay").innerHTML = "You have " + ZIC.df(ZIC.gamedata.resources.zinc) + " zinc.";
		PSBI.function();
		anime({
			targets: item,
			background: "rgb(152,251,152)",
			duration: 2000,
			easing: "easeOutCirc",
			direction: "alternate",
		})
		itemcost.innerHTML = ZIC.df(ZIC.pshopbuttons[PSBI.id].cost) + " Zinc"// + ZIC.pshopbuttons[PSBI.id].costresource.ic.name;
	} else {
		anime({
			targets: item,
			background: "rgb(250,128,114)",
			duration: 2000,
			easing: "easeOutCirc",
			direction: "alternate",
		})
	}
}