import * as Zeloinc from "./construction"; // Zelo Incremental Classes and Functions  File
import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");
import Tabulator = require("../lib/tabulator.min.js");

export var achievements = [];
export var achievementsAlmost = []; // when an achievement is almost there
export var completedAchievements = []; // completed achievements
export var achievementseffect = []; // achievement effects

export var achievementTable = new Tabulator("#achievements", {
	height:"calc(200px + 20vh)",
	layout:"fitColumns",
	columns:[
	{title:"Name", field:"name"},
	{title:"Description", field:"description"},
	{title:"Achieved?", field:"achieved",formatter:"tickCross",align:"center",width:50},
	],
});

export class Achievement {
	constructor(public ainfo: AchievementInfo) {
		achievements.push(ainfo);
	}
}

export class AchievementEffect {
	constructor(public effect: any) {
		achievementseffect.push(effect);
	}
}

export interface AchievementInfo {
	name: string;
	description: string;
	achieved: boolean;
	almost: boolean;
	announced: boolean; // bad
}

export var achievement6 = new Achievement({
	name:"It Begins",
	description:"Buy your first second layer.",
	achieved:false,
	almost:false,
	announced:false
}); export var ae6 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.layers.length >= 3) {
			achievement6.ainfo.achieved = true;
		}
	} 
});
export var achievement8 = new Achievement({
	name:"Zelo101",
	description:"Get to 101.",
	achieved:false,
	almost:false,
	announced:false
}); export var ae8 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.zelocoin.greaterThanOrEqualTo("101")) {
			achievement8.ainfo.achieved = true;
		}
	} 
});
export var achievement1 = new Achievement({
	name:"E-notation",
	description:"Discover the e.",
	achieved:false,
	almost:false,
	announced:false
}); export var ae1 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.zelocoin.greaterThanOrEqualTo(Zeloinc.scientificwhen)) {
			achievement1.ainfo.achieved = true;
		}
	} 
});
export var achievement7 = new Achievement({
	name:"IDFB 1: Welcome Back",
	description:"Load your save",
	achieved:false,
	almost:false,
	announced:false
}); // this achievement is completed in the construction.ts load function.
export var ae7 = new AchievementEffect({effect:function(){
	
}});
export var achievement2 = new Achievement({
	name:"Multi-level Madness",
	description:"Have 5 Layers",
	achieved:false,
	almost:false,
	announced:false
}); export var ae2 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.layers.length >= 6) { // make sure layer 5 is brought as that is when 6 shows up.
			achievement2.ainfo.achieved = true;
		}
	}
});
export var achievement3 = new Achievement({
	name:"Ten Layers Of Wisdom",
	description:"Have 10 Layers higher than 10.",
	achieved:false,
	almost:false,
	announced:false
}); export var ae3 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.layers.length >= 10) {
			let layershaveten = 0;
			for (var i = 0; i < Zeloinc.layers.length; ++i) {
				if (Zeloinc.layers[i].linfo.amount >= 10) {
					layershaveten++;
				}
			}
			//console.log(layershaveten);
			if (layershaveten >= 10) {
				achievement3.ainfo.achieved = true;
			}
		}
	}
});
export var achievement4 = new Achievement({
	name:"Inanimate Infinity",
	description:"Go past 1e309, the biggest number Javascript can handle.",
	achieved:false,
	almost:false,
	announced:false
}); export var ae4 = new AchievementEffect({
	effect:function(){
		if (Zeloinc.zelocoin.greaterThanOrEqualTo("1e309")) {
			achievement4.ainfo.achieved = true;
		}
	}
});
export var achievement5 = new Achievement({
	name:"l33t H@CKeR",
	description:"[REDACTED]",
	achieved:false,
	almost:false,
	announced:false
}); export var ae5 = new AchievementEffect({
	effect:function(){
		let theme = document.body.getAttribute("theme");
		if (theme == "hacker") {
			achievement5.ainfo.achieved = true;
		}
	}
});








export function AchievementCheck() {
	for (var i = 0; i < achievements.length; i++) {
		if (achievements[i].achieved == false) {
			achievementseffect[i].effect();
		}
		if (achievements[i].almost == true) {
			achievementsAlmost.push(achievements[i]);
		}
		if (achievements[i].achieved == true) {
			if (achievements[i].announced == false) {
				completedAchievements.push(achievements[i]);
				document.getElementById("achievementnotify").innerHTML = "Achievement Completed: " + achievements[i].name;
				document.getElementById("achievementbutton").innerHTML = "Achievements " + completedAchievements.length + "/" + achievements.length;
				anime({
				 	targets: '#achievementnotify',
				 	opacity: 1,
				 	endDelay: 4000,
				 	easing: 'linear',
				 	direction: 'alternate',
				});
				achievements[i].announced = true;
				LoadAchievements();
			}	
			//console.log(achievements[i].name);
		}
	}
	//document.getElementById("achievements").style.display = "none";
	//document.getElementById("achievements").style.display = "block";
}

export function AlmostAchievementCheck() { // do not use!!!!
	for (var i = 0; i < achievementsAlmost.length; i++) {
		achievementseffect[i].effect();
		if (achievements[i].achieved == true) {
			completedAchievements.push(achievements[i]);
		}
	}
}

export function LoadAchievements() {
	//console.log(ZIA.completedAchievements);
	//console.log(ZIA.achievementsAlmost);
	//console.log(ZIA.achievements);
	let achievementHelp = document.createElement("p");
	achievementHelp.onclick = function(){};
	document.getElementById("achievements").appendChild(achievementHelp);
	achievementHelp.innerHTML = "Normal means not completed, Bold means almost completed & Green means completed.";
	
	for (var i = 0; i < achievements.length; i++) {
		achievementTable.updateOrAddData([{id:i, name:achievements[i].name,
		description:achievements[i].description,
		achieved:achievements[i].achieved}]);
	}
}

export function ChangeAchievements(variable,changeto) { // mostly for saving/loading
	completedAchievements = [];
	for (var i = 0; i < achievements.length; ++i) {
		variable[i] = changeto[i];
		if (achievements[i].achieved == true) {
			completedAchievements.push(achievements[i]);
		}
	}
}