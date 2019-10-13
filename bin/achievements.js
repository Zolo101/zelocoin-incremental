define(["require", "exports", "./construction", "./script", "./alert", "../lib/anime.min.js"], function (require, exports, ZIC, ZIM, ZAL, anime) {
    "use strict";
    exports.__esModule = true;
    exports.achievements = [];
    exports.achievementsAlmost = []; // when an achievement is almost there
    exports.completedAchievements = []; // completed achievements
    exports.achievementseffect = []; // achievement effects
    var Achievement = /** @class */ (function () {
        function Achievement(ainfo) {
            this.ainfo = ainfo;
            exports.achievements.push(ainfo);
        }
        return Achievement;
    }());
    exports.Achievement = Achievement;
    var AchievementEffect = /** @class */ (function () {
        function AchievementEffect(effect) {
            this.effect = effect;
            exports.achievementseffect.push(effect);
        }
        return AchievementEffect;
    }());
    exports.AchievementEffect = AchievementEffect;
    exports.achievement6 = new Achievement({
        name: "It Begins",
        description: "Buy your first second layer.",
        image: "ITBEGINS",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae6 = new AchievementEffect({
        effect: function () {
            if (ZIC.layers.length >= 3) {
                exports.achievement6.ainfo.achieved = true;
            }
        }
    });
    exports.achievement8 = new Achievement({
        name: "Zelo101",
        description: "Get to 101.",
        image: "ZELO101",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae8 = new AchievementEffect({
        effect: function () {
            if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("101")) {
                exports.achievement8.ainfo.achieved = true;
            }
        }
    });
    exports.achievement1 = new Achievement({
        name: "E-notation",
        description: "Discover the e.",
        image: "ENOTATION",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae1 = new AchievementEffect({
        effect: function () {
            if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo(ZIC.scientificwhen)) {
                exports.achievement1.ainfo.achieved = true;
            }
        }
    });
    exports.achievement7 = new Achievement({
        name: "IDFB 1: Welcome Back",
        description: "Load your save",
        image: "IDFB1WELCOMEBACK",
        achieved: false,
        almost: false,
        announced: false
    }); // this achievement is completed in the construction.ts load function.
    exports.ae7 = new AchievementEffect({ effect: function () { } });
    exports.achievement10 = new Achievement({
        name: "Prestige",
        description: "Prestige (and gain at least 1 zinc or zirconium)",
        image: "PRESTIGE",
        achieved: false,
        almost: false,
        announced: false
    }); // this achievement is completed in the prestige.ts 
    exports.ae10 = new AchievementEffect({ effect: function () { } });
    exports.achievement2 = new Achievement({
        name: "Multi-layer Madness",
        description: "Have 6 Layers",
        image: "MULTILEVELMADNESS",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae2 = new AchievementEffect({
        effect: function () {
            if (ZIC.layers.length >= 7) { // make sure layer 6 is brought as that is when 6 shows up.
                exports.achievement2.ainfo.achieved = true;
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
    exports.achievement3 = new Achievement({
        name: "Ten Layers Of Wisdom",
        description: "Have 10 Layers higher than 10.",
        image: "TENLAYERSOFWISDOM",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae3 = new AchievementEffect({
        effect: function () {
            if (ZIC.layers.length >= 10) {
                var layershaveten = 0;
                for (var i = 0; i < ZIC.layers.length; ++i) {
                    if (ZIC.layers[i].linfo.amount >= 10) {
                        layershaveten++;
                    }
                }
                //console.log(layershaveten);
                if (layershaveten >= 10) {
                    exports.achievement3.ainfo.achieved = true;
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
    exports.achievement12 = new Achievement({
        name: "Prestige Expert",
        description: "Prestige over 5 Times.",
        image: "PRESTIGEEXPERT",
        achieved: false,
        almost: false,
        announced: false
    }); // this achievement is completed in the prestige.ts load function.
    exports.ae12 = new AchievementEffect({ effect: function () { } });
    exports.achievement4 = new Achievement({
        name: "Inanimate Infinity",
        description: "Go past 1e309, the biggest number Javascript can handle.",
        image: "INANIMATEINFINITY",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae4 = new AchievementEffect({
        effect: function () {
            if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("1e309")) {
                exports.achievement4.ainfo.achieved = true;
            }
        }
    });
    exports.achievement5 = new Achievement({
        name: "l33t H@CKeR",
        description: "[REDACTED]",
        image: "LEETHACKER",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae5 = new AchievementEffect({
        effect: function () {
            var theme = document.body.getAttribute("theme");
            if (theme == "hacker") {
                exports.achievement5.ainfo.achieved = true;
            }
        }
    });
    exports.achievement9 = new Achievement({
        name: "debug achievement",
        description: "Yes",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae9 = new AchievementEffect({
        effect: function () {
            if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("4")) {
                exports.achievement9.ainfo.achieved = true;
            }
        }
    });
    exports.achievement11 = new Achievement({
        name: "debug achievement2",
        description: "Yes2",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae11 = new AchievementEffect({
        effect: function () {
            if (ZIC.gamedata.zelocoin.greaterThanOrEqualTo("4")) {
                exports.achievement11.ainfo.achieved = true;
            }
        }
    });
    function AchievementCheck() {
        for (var i = 0; i < exports.achievements.length; i++) {
            if (exports.achievements[i].achieved == false) {
                //achievementseffect[i].effect();
                exports.achievementseffect[i]['effect']();
                //console.log(achievementseffect[i]);
                //console.log(achievementseffect[i].effect);
            }
            //if (achievements[i].almost == true) { nope
            //	achievementsAlmost.push(achievements[i]);
            //}
            if (exports.achievements[i].achieved == true) {
                if (exports.achievements[i].announced == false) {
                    exports.completedAchievements.push(exports.achievements[i]);
                    document.getElementById("achievementnotify").innerHTML = "Achievement Completed: " + exports.achievements[i].name;
                    document.getElementById("categoryachievements").innerHTML = "Achievements " + exports.completedAchievements.length + "/" + exports.achievements.length;
                    anime({
                        targets: '#achievementnotify',
                        opacity: 1,
                        endDelay: 4000,
                        easing: 'linear',
                        direction: 'alternate'
                    });
                    exports.achievements[i].announced = true;
                    LoadAchievements();
                }
                //console.log(achievements[i].name);
            }
        }
        //document.getElementById("achievements").style.display = "none";
        //document.getElementById("achievements").style.display = "block";
    }
    exports.AchievementCheck = AchievementCheck;
    function AlmostAchievementCheck() {
        for (var i = 0; i < exports.achievementsAlmost.length; i++) {
            exports.achievementseffect[i].effect();
            if (exports.achievements[i].achieved == true) {
                exports.completedAchievements.push(exports.achievements[i]);
            }
        }
    }
    exports.AlmostAchievementCheck = AlmostAchievementCheck;
    function LoadAchievements() {
        ZAL.ClearAlert(); // idk what happened, i thought i fixed this
        //console.log(ZIA.completedAchievements);
        //console.log(ZIA.achievementsAlmost);
        //console.log(ZIA.achievements);
        if (document.getElementById("alert").getAttribute("category") == ZIM.achievementsAlert.ainfo.categoryid) {
            var achievementscontainer = new ZIC.Element({
                type: "div",
                id: "achievementContainer",
                append: "alert"
            });
            for (var i = 0; i < exports.achievements.length; i++) {
                var achievementdiv = new ZIC.Element({
                    type: "div",
                    id: "achievementdiv" + i,
                    "class": "achievementsdiv",
                    append: "achievementContainer"
                });
                if (exports.achievements[i].achieved) {
                    document.getElementById("achievementdiv" + i).style.backgroundColor = "green";
                }
                //console.log(achievementdiv);
                if (exports.achievements[i].image != null) {
                    var achievementicon = new ZIC.Element({
                        type: "img",
                        id: "achievementicon" + i,
                        append: "achievementdiv" + i
                    });
                    document.getElementById("achievementicon" + i).setAttribute("src", "../lib/img/achievements/" + exports.achievements[i].image + ".png");
                    document.getElementById("achievementicon" + i).setAttribute("alt", exports.achievements[i].image);
                }
                var achievementstextdiv = new ZIC.Element({
                    type: "div",
                    id: "achievementstextdiv" + i,
                    "class": "achievementstextdiv",
                    append: "achievementdiv" + i
                });
                var achievementstitle = new ZIC.Element({
                    type: "h3",
                    id: "achievementtitle" + i,
                    "class": "achievementitle",
                    append: "achievementstextdiv" + i,
                    innerHTML: exports.achievements[i].name
                });
                var achievementstext = new ZIC.Element({
                    type: "p",
                    id: "achievementtext" + i,
                    append: "achievementstextdiv" + i,
                    innerHTML: exports.achievements[i].description
                });
            }
            document.getElementById("alert").appendChild(document.getElementById("achievementContainer"));
        }
    }
    exports.LoadAchievements = LoadAchievements;
    function ChangeAchievements(variable, changeto) {
        exports.completedAchievements = [];
        for (var i = 0; i < exports.achievements.length; ++i) {
            if (exports.achievements[i] != undefined) {
                variable[i] = changeto[i];
                if (exports.achievements[i].achieved) {
                    exports.completedAchievements.push(exports.achievements[i]);
                }
            }
        }
        console.log(exports.achievements);
    }
    exports.ChangeAchievements = ChangeAchievements;
});
