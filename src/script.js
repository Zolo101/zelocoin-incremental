define("achievements", ["require", "exports", "construction", "../lib/anime.min.js", "../lib/tabulator.min.js"], function (require, exports, Zeloinc, anime, Tabulator) {
    "use strict";
    exports.__esModule = true;
    exports.achievements = [];
    exports.achievementsAlmost = []; // when an achievement is almost there
    exports.completedAchievements = []; // completed achievements
    exports.achievementseffect = []; // achievement effects
    exports.achievementTable = new Tabulator("#achievements", {
        height: "calc(200px + 20vh)",
        layout: "fitColumns",
        columns: [
            { title: "Name", field: "name" },
            { title: "Description", field: "description" },
            { title: "Achieved?", field: "achieved", formatter: "tickCross", align: "center", width: 50 },
        ]
    });
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
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae6 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.layers.length >= 3) {
                exports.achievement6.ainfo.achieved = true;
            }
        }
    });
    exports.achievement8 = new Achievement({
        name: "Zelo101",
        description: "Get to 101.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae8 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.zelocoin.greaterThanOrEqualTo("101")) {
                exports.achievement8.ainfo.achieved = true;
            }
        }
    });
    exports.achievement1 = new Achievement({
        name: "E-notation",
        description: "Discover the e.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae1 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.zelocoin.greaterThanOrEqualTo(Zeloinc.scientificwhen)) {
                exports.achievement1.ainfo.achieved = true;
            }
        }
    });
    // export var achievement7 = new Achievement({
    // 	name:"IDFB 1: Welcome Back",
    // 	description:"Load your save",
    // 	achieved:false,
    // 	almost:false,
    // 	announced:false
    // }); // this achievement is completed in the construction.ts load function.
    // export var ae7 = new AchievementEffect({effect:function(){}});
    exports.achievement2 = new Achievement({
        name: "Multi-level Madness",
        description: "Have 5 Layers",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae2 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.layers.length >= 6) { // make sure layer 5 is brought as that is when 6 shows up.
                exports.achievement2.ainfo.achieved = true;
            }
        }
    });
    exports.achievement3 = new Achievement({
        name: "Ten Layers Of Wisdom",
        description: "Have 10 Layers higher than 10.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae3 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.layers.length >= 10) {
                var layershaveten = 0;
                for (var i = 0; i < Zeloinc.layers.length; ++i) {
                    if (Zeloinc.layers[i].linfo.amount >= 10) {
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
    exports.achievement4 = new Achievement({
        name: "Inanimate Infinity",
        description: "Go past 1e309, the biggest number Javascript can handle.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae4 = new AchievementEffect({
        effect: function () {
            if (Zeloinc.zelocoin.greaterThanOrEqualTo("1e309")) {
                exports.achievement4.ainfo.achieved = true;
            }
        }
    });
    exports.achievement5 = new Achievement({
        name: "l33t H@CKeR",
        description: "[REDACTED]",
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
    function AchievementCheck() {
        for (var i = 0; i < exports.achievements.length; i++) {
            if (exports.achievements[i].achieved == false) {
                exports.achievementseffect[i].effect();
            }
            if (exports.achievements[i].almost == true) {
                exports.achievementsAlmost.push(exports.achievements[i]);
            }
            if (exports.achievements[i].achieved == true) {
                if (exports.achievements[i].announced == false) {
                    exports.completedAchievements.push(exports.achievements[i]);
                    document.getElementById("achievementnotify").innerHTML = "Achievement Completed: " + exports.achievements[i].name;
                    document.getElementById("achievementbutton").innerHTML = "Achievements " + exports.completedAchievements.length + "/" + exports.achievements.length;
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
        //console.log(ZIA.completedAchievements);
        //console.log(ZIA.achievementsAlmost);
        //console.log(ZIA.achievements);
        var achievementHelp = document.createElement("p");
        achievementHelp.onclick = function () { };
        document.getElementById("achievements").appendChild(achievementHelp);
        achievementHelp.innerHTML = "Normal means not completed, Bold means almost completed & Green means completed.";
        for (var i = 0; i < exports.achievements.length; i++) {
            exports.achievementTable.updateOrAddData([{ id: i, name: exports.achievements[i].name,
                    description: exports.achievements[i].description,
                    achieved: exports.achievements[i].achieved }]);
        }
    }
    exports.LoadAchievements = LoadAchievements;
    function ChangeAchievements(variable, changeto) {
        exports.completedAchievements = [];
        for (var i = 0; i < exports.achievements.length; ++i) {
            variable[i] = changeto[i];
            if (exports.achievements[i].achieved == true) {
                exports.completedAchievements.push(exports.achievements[i]);
            }
        }
    }
    exports.ChangeAchievements = ChangeAchievements;
});
define("construction", ["require", "exports", "../lib/break_infinity.min.js", "../lib/ad-notations.min.js", "achievements"], function (require, exports, Decimal, ADNotations, ZIA) {
    "use strict";
    exports.__esModule = true;
    var scientific = new ADNotations.ScientificNotation();
    exports.layers = [];
    exports.zelocoin = new Decimal(2);
    exports.money = new Decimal(0);
    exports.ps = new Decimal(0);
    exports.buffer = new Decimal(0);
    exports.VERSION = "1.1.2";
    exports.scientificwhen = new Decimal(1e+5);
    var Layer = /** @class */ (function () {
        function Layer(linfo) {
            this.linfo = linfo;
            var layerbutton = document.createElement("button");
            document.getElementById("layer").appendChild(layerbutton);
            layerbutton.id = "layer" + linfo.id;
            layerbutton.innerHTML = "<b>" + linfo.amount + "</b><br>Layer " + linfo.id + "<br>" + linfo.cost + " Zelocoin";
            layerbutton.onclick = function () { LayerCheck(linfo); };
        }
        return Layer;
    }());
    exports.Layer = Layer;
    exports.layers[0] = new Layer({ id: 1, cost: new Decimal(2), amount: new Decimal(0) });
    exports.layers[1] = new Layer({ id: 2, cost: new Decimal(100), amount: new Decimal(0) });
    function LayerCheck(linfo) {
        if (exports.zelocoin.greaterThanOrEqualTo(linfo.cost)) {
            exports.zelocoin = exports.zelocoin.minus(linfo.cost);
            linfo.amount = linfo.amount.plus(1);
            linfo.amount.toNumber();
            linfo.cost = linfo.cost.times(2);
            if (exports.layers[linfo.id] == null) {
                exports.layers[linfo.id] = new Layer({ id: linfo.id + 1, cost: new Decimal(("1e+" + Number(linfo.id * 2)).toString()), amount: new Decimal(0) });
            }
            UpdateLayer(linfo);
            UpdateZelocoins();
        }
    }
    exports.LayerCheck = LayerCheck;
    function Save() {
        if (window.confirm("Are you sure you want to save?")) {
            localStorage.setItem("layers", JSON.stringify(exports.layers));
            localStorage.setItem("zelocoin", exports.zelocoin);
            localStorage.setItem("ps", exports.ps);
            localStorage.setItem("achievements", JSON.stringify(ZIA.achievements));
            //console.log(ZIA.achievements);
            localStorage.setItem("completedAchievements", JSON.stringify(ZIA.completedAchievements));
            localStorage.setItem("theme", document.body.getAttribute("theme"));
            localStorage.setItem("version", exports.VERSION); // remember to change this each version	
        }
    }
    exports.Save = Save;
    function Load() {
        if (window.confirm("Are you sure you want to load?")) {
            document.getElementById("layer").innerHTML = "";
            exports.layers = JSON.parse(localStorage.getItem("layers"));
            for (var i = 0; i < exports.layers.length; ++i) {
                exports.layers[i].linfo.amount = new Decimal(exports.layers[i].linfo.amount);
                exports.layers[i].linfo.cost = new Decimal(exports.layers[i].linfo.cost);
                if (document.getElementById("layer" + exports.layers[i].linfo.id) == null) {
                    exports.layers[i] = new Layer({ id: exports.layers[i].linfo.id, cost: new Decimal(exports.layers[i].linfo.cost), amount: new Decimal(exports.layers[i].linfo.amount) });
                    //console.log(layers[i].linfo);
                }
            }
            exports.zelocoin = new Decimal(localStorage.getItem("zelocoin"));
            exports.ps = new Decimal(localStorage.getItem("ps"));
            ZIA.ChangeAchievements(ZIA.achievements, JSON.parse(localStorage.getItem("achievements")));
            ZIA.ChangeAchievements(ZIA.completedAchievements, JSON.parse(localStorage.getItem("completedAchievements")));
            //console.log(ZIA.achievements);
            //console.log(JSON.parse(localStorage.getItem("achievements")));
            document.body.setAttribute("theme", localStorage.getItem("theme"));
            document.getElementById("achievementbutton").innerHTML = "Achievements " + ZIA.completedAchievements.length + "/" + ZIA.achievements.length;
            UpdateZelocoins();
            if (localStorage.getItem("version") != exports.VERSION) {
                window.alert("Just to let you know, this save is from version " + localStorage.getItem("version") + " so some things may/may not work. To fix this, you can press the save button to update your save to the correct version.");
            }
            // console.log(ZIA.achievement7.ainfo.achieved);
            // if (!ZIA.achievement7.ainfo.achieved) {
            // 	ZIA.achievement7.ainfo.achieved = true;
            // 	console.log(ZIA.achievement7.ainfo.achieved);
            // }
        }
    }
    exports.Load = Load;
    function Tick() {
        exports.ps = exports.ps.minus(exports.ps);
        for (var i = exports.layers.length - 1; i >= 0; i--) {
            var flinfo = exports.layers[i].linfo;
            exports.buffer = exports.buffer.add(flinfo.amount); //times(flinfo.amount);
            //buffer = buffer.times(flinfo.amount); //quick and fast numbers, for debugging
            if (i != exports.layers.length - 1) {
                //console.log(layers[i+1]);
                flinfo.amount = flinfo.amount.plus(exports.layers[i + 1].linfo.amount);
            }
            UpdateLayer(flinfo);
        }
        // console.log(buffer);
        // console.log(layers);
        exports.ps = exports.ps.plus(exports.buffer);
        exports.zelocoin = exports.zelocoin.plus(exports.ps);
        UpdateZelocoins();
        exports.buffer = exports.buffer.minus(exports.buffer);
    }
    exports.Tick = Tick;
    function UpdateLayer(linfo) {
        if (linfo.cost.greaterThanOrEqualTo(exports.scientificwhen)) {
            document.getElementById("layer" + linfo.id).innerHTML = "<b>" + scientific.format(linfo.amount, 2, 0) + "</b><br>Layer " + linfo.id + "<br>" + scientific.format(linfo.cost, 2, 0) + " Zelocoin";
        }
        else {
            document.getElementById("layer" + linfo.id).innerHTML = "<b>" + linfo.amount.toString() + "</b><br>Layer " + linfo.id + "<br>" + linfo.cost.toNumber() + " Zelocoin";
        }
    }
    exports.UpdateLayer = UpdateLayer;
    function UpdateZelocoins() {
        if (exports.zelocoin.greaterThanOrEqualTo(exports.scientificwhen)) {
            document.getElementById("coin").innerHTML = scientific.format(exports.zelocoin, 2, 0) + " zelocoins";
        }
        else {
            document.getElementById("coin").innerHTML = exports.zelocoin.toNumber() + " zelocoins";
        }
        if (exports.ps.greaterThanOrEqualTo(exports.scientificwhen)) {
            document.getElementById("ps").innerHTML = "You are making " + scientific.format(exports.ps, 2, 0) + " (" + Decimal.div(exports.ps, exports.zelocoin).times(100).toNumber().toFixed(2) + "%) zelocoins.";
        }
        else {
            document.getElementById("ps").innerHTML = "You are making " + exports.ps.toString() + " (" + Decimal.div(exports.ps, exports.zelocoin).times(100).toNumber().toFixed(2) + "%) zelocoins.";
        }
    }
    exports.UpdateZelocoins = UpdateZelocoins;
});
define("script", ["require", "exports", "construction", "achievements"], function (require, exports, Zeloinc, ZIA) {
    "use strict";
    exports.__esModule = true;
    var themes = [["light", "Light Theme"], ["dark", "Dark Theme"],
        ["hacker", "Hacker Theme"], ["modern", "Modern Theme"] /*,["fancy","Fancy Theme"]*/, ["minimal", "Minimal Theme"]];
    var themenum = 0;
    var tick = 1000;
    document.body.setAttribute("theme", themes[themenum][0]);
    var themeButton = document.createElement("button");
    themeButton.onclick = function () { changeTheme(); };
    document.getElementById("other").appendChild(themeButton);
    themeButton.innerHTML = themes[themenum][1];
    themenum++;
    //console.log(ZIA.achievements);
    document.getElementById("achievements").style.display = "none";
    var achievementButton = document.createElement("button");
    achievementButton.onclick = function () {
        if (document.getElementById("achievements").style.display == "none") {
            document.getElementById("achievements").style.display = "block";
            ZIA.LoadAchievements();
        }
        else {
            document.getElementById("achievements").style.display = "none";
        }
    };
    document.getElementById("other").appendChild(achievementButton);
    achievementButton.id = "achievementbutton";
    achievementButton.innerHTML = "Achievements 0/" + ZIA.achievements.length;
    var br = document.createElement("br");
    document.getElementById("other").appendChild(br); //bruh
    var achievementNotify = document.createElement("p");
    document.getElementById("other").appendChild(achievementNotify);
    achievementNotify.id = "achievementnotify";
    achievementNotify.innerHTML = "Achievement Completed: ";
    var saveButton = document.createElement("button");
    saveButton.onclick = function () { Zeloinc.Save(); };
    document.getElementById("saving").appendChild(saveButton);
    saveButton.id = "savebutton";
    saveButton.innerHTML = "Save";
    var loadButton = document.createElement("button");
    loadButton.onclick = function () { Zeloinc.Load(); };
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
        }
        else {
            themeButton.innerHTML = themes[themenum][1];
        }
        document.body.setAttribute("theme", themes[themenum][0]);
        themenum++;
    }
    console.log("Everything is good to go :)");
});
