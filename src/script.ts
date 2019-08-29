import * as Zeloinc from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIA from "./achievements"; // Zelo Incremental Achievements File
var themes = [["light","Light Theme"],["dark","Dark Theme"],
				["hacker","Hacker Theme"],["modern","Modern Theme"]/*,["fancy","Fancy Theme"]*/,["minimal","Minimal Theme"]];
var themenum = 0;
var tick = 1000;

//console.log(ZIA.achievementseffect);

import anime = require("../lib/anime.min.js");
import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

document.body.setAttribute("theme",themes[themenum][0]);

let themeButton = document.createElement("button");
themeButton.onclick = function(){changeTheme()};
document.getElementById("other").appendChild(themeButton);
themeButton.innerHTML = themes[themenum][1];
themenum++;
//console.log(ZIA.achievements);

document.getElementById("achievements").style.display = "none";
let achievementButton = document.createElement("button");
achievementButton.onclick = function(){
	if (document.getElementById("achievements").style.display == "none") {
		document.getElementById("achievements").style.display = "block";
		ZIA.LoadAchievements();
	} else {
		document.getElementById("achievements").style.display = "none";
	}};
document.getElementById("other").appendChild(achievementButton);
achievementButton.id = "achievementbutton";
achievementButton.innerHTML = "Achievements 0/" + ZIA.achievements.length;

let br = document.createElement("br");
document.getElementById("other").appendChild(br); //bruh

let achievementNotify = document.createElement("p");
document.getElementById("other").appendChild(achievementNotify);
achievementNotify.id = "achievementnotify";
achievementNotify.innerHTML = "Achievement Completed: ";

let saveButton = document.createElement("button");
saveButton.onclick = function(){Zeloinc.Save()};
document.getElementById("saving").appendChild(saveButton);
saveButton.id = "savebutton";
saveButton.innerHTML = "Save";

let loadButton = document.createElement("button");
loadButton.onclick = function(){Zeloinc.Load()};
document.getElementById("saving").appendChild(loadButton);
loadButton.id = "loadbutton";
loadButton.innerHTML = "Load";

var interval = 0;

window.setInterval(function () {
	interval++;
	Zeloinc.Tick();
	ZIA.AlmostAchievementCheck();
	if (interval >= 5) {
		interval = 0;
		ZIA.AchievementCheck();
	}
}, tick);

function changeTheme() {
	if (themenum >= themes.length) {
		themenum = 0;
		themeButton.innerHTML = themes[0][1];
	} else {
		themeButton.innerHTML = themes[themenum][1];
	} 
	document.body.setAttribute("theme",themes[themenum][0]);
	themenum++;
}

console.log("Everything is good to go :)");