import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIP from "./prestige"; // Zelo Incremental Prestige File
import * as ZIM from "./script"; // Zelo Incremental Main File
import * as ZAL from "./alert"; // Zelo Alert File
import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

export var achievements = [];
export var achievementsAlmost = []; // when an achievement is almost there
export var completedAchievements = []; // completed achievements
export var achievementseffect = []; // achievement effects

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
	image?: string;
}

export var achievement6 = new Achievement({
	name:"It Begins",
	description:"Buy your first second layer.",
	image: "ITBEGINS",
	achieved:false,
	almost:false,
	announced:false
}); export var ae6 = new AchievementEffect({
	effect:function(){
		if (ZIC.layers.length >= 3) {
			achievement6.ainfo.achieved = true;
		}
	} 
});
export var achievement8 = new Achievement({
	name:"Zelo101",
	description:"Get to 101.",
	image:"ZELO101",
	achieved:false,
	almost:false,
	announced:false
}); export var ae8 = new AchievementEffect({
	effect:function(){
		if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("101")) {
			achievement8.ainfo.achieved = true;
		}
	} 
});
export var achievement1 = new Achievement({
	name:"E-notation",
	description:"Discover the e.",
	image:"ENOTATION",
	achieved:false,
	almost:false,
	announced:false
}); export var ae1 = new AchievementEffect({
	effect:function(){
		if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo(ZIC.scientificwhen)) {
			achievement1.ainfo.achieved = true;
		}
	} 
});
export var achievement7 = new Achievement({
	name:"IDFB 1: Welcome Back",
	description:"Load your save",
	image:"IDFB1WELCOMEBACK",
	achieved:false,
	almost:false,
	announced:false
}); // this achievement is completed in the construction.ts load function.
export var ae7 = new AchievementEffect({effect:function(){}});
export var achievement10 = new Achievement({
	name:"Prestige",
	description:"Prestige (and gain at least 1 zinc or zirconium)",
	image:"PRESTIGE",
	achieved:false,
	almost:false,
	announced:false
}); // this achievement is completed in the prestige.ts 
export var ae10 = new AchievementEffect({effect:function(){}});
export var achievement2 = new Achievement({
	name:"Multi-layer Madness",
	description:"Have 6 Layers",
	image:"MULTILEVELMADNESS",
	achieved:false,
	almost:false,
	announced:false
}); export var ae2 = new AchievementEffect({
	effect:function(){
		if (ZIC.layers.length >= 7) { // make sure layer 6 is brought as that is when 6 shows up.
			achievement2.ainfo.achieved = true;
		}
	}
});
// export var achievement9 = new Achievement({
// 	name:"Zinc Battery",
// 	description:"Gain zinc.",
// 	image:"ZINCBATTERY",
// 	achieved:false,
// 	almost:false,
// 	announced:false
// }); export var ae9 = new AchievementEffect({
// 	effect:function(){
// 		if (ZIP.zinc >= 1) { // make sure layer 5 is brought as that is when 6 shows up.
// 			achievement9.ainfo.achieved = true;
// 		}
// 	}
// });
export var achievement3 = new Achievement({
	name:"Ten Layers Of Wisdom",
	description:"Have 10 Layers higher than 10.",
	image:"TENLAYERSOFWISDOM",
	achieved:false,
	almost:false,
	announced:false
}); export var ae3 = new AchievementEffect({
	effect:function(){
		if (ZIC.layers.length >= 10) {
			let layershaveten = 0;
			for (var i = 0; i < ZIC.layers.length; ++i) {
				if (ZIC.layers[i].linfo.amount >= 10) {
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
// export var achievement10 = new Achievement({
// 	name:"Zirconium Collecter",
// 	description:"Gain Zirconium.",
// 	image:"ZIRCONIUMCOLLECTER",
// 	achieved:false,
// 	almost:false,
// 	announced:false
// }); export var ae10= new AchievementEffect({
// 	effect:function(){
// 		if (ZIP.zirconium >= 1) {
// 			achievement10.ainfo.achieved = true;
// 		}
// 	}
// });
export var achievement12 = new Achievement({
	name:"Prestige Expert",
	description:"Prestige over 5 Times.",
	image:"PRESTIGEEXPERT",
	achieved:false,
	almost:false,
	announced:false
}); // this achievement is completed in the prestige.ts load function.
export var ae12 = new AchievementEffect({effect:function(){}});
export var achievement4 = new Achievement({
	name:"Inanimate Infinity",
	description:"Go past 1e309, the biggest number Javascript can handle.",
	image:"INANIMATEINFINITY",
	achieved:false,
	almost:false,
	announced:false
}); export var ae4 = new AchievementEffect({
	effect:function(){
		if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("1e309")) {
			achievement4.ainfo.achieved = true;
		}
	}
});
export var achievement5 = new Achievement({
	name:"l33t H@CKeR",
	description:"[REDACTED]",
	image:"LEETHACKER",
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
export var achievement9 = new Achievement({
	name:"debug achievement",
	description:"Yes",
	achieved:false,
	almost:false,
	announced:false
}); export var ae9 = new AchievementEffect({
	effect:function(){
		if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("4")) {
			achievement9.ainfo.achieved = true;
		}
	}
});
export var achievement11 = new Achievement({
	name:"debug achievement2",
	description:"Yes2",
	achieved:false,
	almost:false,
	announced:false
}); export var ae11 = new AchievementEffect({
	effect:function(){
		if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("4")) {
			achievement11.ainfo.achieved = true;
		}
	}
});








export function AchievementCheck() {
	for (var i = 0; i < achievements.length; i++) {
		if (achievements[i].achieved == false) {
			//achievementseffect[i].effect();
			achievementseffect[i]['effect']();
			//console.log(achievementseffect[i]);
			//console.log(achievementseffect[i].effect);
		}
		//if (achievements[i].almost == true) { nope
		//	achievementsAlmost.push(achievements[i]);
		//}
		if (achievements[i].achieved == true) {
			if (achievements[i].announced == false) {
				completedAchievements.push(achievements[i]);
				document.getElementById("achievementnotify").innerHTML = "Achievement Completed: " + achievements[i].name;
				document.getElementById("categoryachievements").innerHTML = "Achievements " + completedAchievements.length + "/" + achievements.length;
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
	ZAL.ClearAlert(); // idk what happened, i thought i fixed this
	//console.log(ZIA.completedAchievements);
	//console.log(ZIA.achievementsAlmost);
	//console.log(ZIA.achievements);
	if (document.getElementById("alert").getAttribute("category") == ZIM.achievementsAlert.ainfo.categoryid) {
	let achievementscontainer = new ZIC.Element({
		type: "div",
		id: "achievementContainer",
		append: "alert",
	})
	for (var i = 0; i < achievements.length; i++) {
		let achievementdiv = new ZIC.Element({
			type: "div",
			id: "achievementdiv" + i,
			class: "achievementsdiv",
			append: "achievementContainer"
		});

		if (achievements[i].achieved) {
			document.getElementById("achievementdiv" + i).style.backgroundColor = "green";
		}

		//console.log(achievementdiv);
		if (achievements[i].image != null) {
			let achievementicon = new ZIC.Element({
				type: "img",
				id: "achievementicon" + i,
				append: "achievementdiv" + i,
			})

			document.getElementById("achievementicon" + i).setAttribute("src","../lib/img/achievements/" + achievements[i].image + ".png");
			document.getElementById("achievementicon" + i).setAttribute("alt",achievements[i].image);
		}
		let achievementstextdiv = new ZIC.Element({
			type: "div",
			id: "achievementstextdiv" + i,
			class: "achievementstextdiv",
			append: "achievementdiv" + i,
		})
		let achievementstitle = new ZIC.Element({
			type: "h3",
			id: "achievementtitle" + i,
			class: "achievementitle",
			append: "achievementstextdiv" + i,
			innerHTML: achievements[i].name,
		})
		let achievementstext = new ZIC.Element({
			type: "p",
			id: "achievementtext" + i,
			append: "achievementstextdiv" + i,
			innerHTML: achievements[i].description,
		})
	}

	document.getElementById("alert").appendChild(document.getElementById("achievementContainer"));
	}
}

export function ChangeAchievements(variable,changeto) { // mostly for saving/loading
	completedAchievements = [];
	for (var i = 0; i < achievements.length; ++i) {
		if (achievements[i] != undefined) {
			variable[i] = changeto[i];
			if (achievements[i].achieved) {
				completedAchievements.push(achievements[i]);
			}
		}
	}
	console.log(achievements);
}