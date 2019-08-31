define("prestige", ["require", "exports", "../lib/break_infinity.min.js", "construction"], function (require, exports, Decimal, ZIC) {
    "use strict";
    exports.__esModule = true;
    exports.zinc = new Decimal(0); //1% coin boost
    exports.zirconium = new Decimal(0); //currency for prestige shop
    exports.zincPotential = new Decimal(0); // UpdateGains();
    exports.zirconiumPotential = new Decimal(0); // UpdateGains();
    exports.layerUpButtonCost = new Decimal(2); // UpdateLayerUpButton();
    //export var zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
    //export var zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();
    exports.shopbuttons = []; // to be used soon
    var prestigeButton = document.createElement("button");
    prestigeButton.onclick = function () { Prestige(); };
    document.getElementById("prestige").appendChild(prestigeButton);
    prestigeButton.id = "prestigebutton";
    prestigeButton.innerHTML = "Prestige";
    var br = document.createElement("br");
    document.getElementById("other").appendChild(br); //bruh
    var layerUpButton = document.createElement("button");
    layerUpButton.onclick = function () { UpdateLayerUpButton(); };
    document.getElementById("prestige").appendChild(layerUpButton);
    layerUpButton.id = "layerupbutton";
    layerUpButton.innerHTML = "Increase Max Layer for<br> 2 Zirconium";
    var zincelement = document.getElementById("zinc");
    var zirconiumelement = document.getElementById("zirconium");
    function Prestige() {
        if (window.confirm("Are you sure you want to Prestige? You will lose your zelocoins & layers.")) {
            exports.zinc = exports.zinc.plus(exports.zincPotential);
            exports.zirconium = exports.zirconium.plus(exports.zirconiumPotential);
            exports.zincPotential = exports.zincPotential.minus(exports.zincPotential);
            exports.zirconiumPotential = exports.zirconiumPotential.minus(exports.zirconiumPotential);
            ZIC.CoinBoost(exports.zinc);
            //console.log(ZIC.coinboost);
            ZIC.PrestigeReset();
            console.log("Prestige'd");
            UpdatePrestigeElements();
        }
    }
    exports.Prestige = Prestige;
    function UpdateGains() {
        var zinc_zero = ZIC.DecimalFormat(exports.zincPotential) ? ZIC.scientific.format(exports.zincPotential, 2, 0) : exports.zincPotential.toNumber();
        var zirconium_zero = ZIC.DecimalFormat(exports.zirconiumPotential) ? ZIC.scientific.format(exports.zirconiumPotential, 2, 0) : exports.zirconiumPotential.toNumber();
        var zinc_format = ZIC.DecimalFormat(exports.zinc) ? ZIC.scientific.format(exports.zinc, 2, 0) : exports.zinc.toNumber();
        var zirconium_format = ZIC.DecimalFormat(exports.zirconium) ? ZIC.scientific.format(exports.zirconium, 2, 0) : exports.zirconium.toNumber();
        exports.zincPotential = exports.zincPotential.minus(exports.zincPotential);
        exports.zirconiumPotential = exports.zirconiumPotential.minus(exports.zirconiumPotential);
        exports.zincPotential = exports.zincPotential.add(ZIC.zelocoin).dividedBy(1e+10).floor();
        exports.zirconiumPotential = exports.zirconiumPotential.add(ZIC.ps).dividedBy(1e+8).floor();
        zincelement.innerHTML = zinc_format + " Zinc (+" + zinc_zero + ")";
        zirconiumelement.innerHTML = zirconium_format + " Zirconium (+" + zirconium_zero + ")";
    }
    exports.UpdateGains = UpdateGains;
    function UpdatePrestigeElements() {
        var zinc_zero = ZIC.DecimalFormat(exports.zincPotential) ? ZIC.scientific.format(exports.zincPotential, 2, 0) : exports.zincPotential.toNumber();
        var zirconium_zero = ZIC.DecimalFormat(exports.zirconiumPotential) ? ZIC.scientific.format(exports.zirconiumPotential, 2, 0) : exports.zirconiumPotential.toNumber();
        var zinc_format = ZIC.DecimalFormat(exports.zinc) ? ZIC.scientific.format(exports.zinc, 2, 0) : exports.zinc.toNumber();
        var zirconium_format = ZIC.DecimalFormat(exports.zirconium) ? ZIC.scientific.format(exports.zirconium, 2, 0) : exports.zirconium.toNumber();
        // repeated variables...
        zincelement.innerHTML = zinc_format + " Zinc (+" + zinc_zero + ")";
        zirconiumelement.innerHTML = zirconium_format + " Zirconium (+" + zirconium_zero + ")";
        //console.log(zinc_format);
        //console.log(zirconium_format);
    }
    exports.UpdatePrestigeElements = UpdatePrestigeElements;
    function UpdateLayerUpButton() {
        var layerupbuttoncost_format = ZIC.DecimalFormat(exports.layerUpButtonCost) ? ZIC.scientific.format(exports.layerUpButtonCost, 2, 0) : exports.layerUpButtonCost.toNumber();
        if (exports.zirconium.greaterThanOrEqualTo(exports.layerUpButtonCost)) {
            exports.zirconium = exports.zirconium.minus(exports.layerUpButtonCost);
            exports.layerUpButtonCost = exports.layerUpButtonCost.times(exports.layerUpButtonCost);
            //console.log(layerUpButtonCost.toNumber());
            ZIC.MaxLevelChange(1);
            layerupbuttoncost_format = ZIC.DecimalFormat(exports.layerUpButtonCost) ? ZIC.scientific.format(exports.layerUpButtonCost, 2, 0) : exports.layerUpButtonCost.toNumber();
            layerUpButton.innerHTML = "Increase Max Layer for<br>" + layerupbuttoncost_format + " Zirconium";
            UpdatePrestigeElements();
        }
    }
    exports.UpdateLayerUpButton = UpdateLayerUpButton;
    function LocalStoragePrestige() {
        exports.zinc = new Decimal(localStorage.getItem("zinc"));
        exports.zirconium = new Decimal(localStorage.getItem("zirconium"));
    }
    exports.LocalStoragePrestige = LocalStoragePrestige;
});
define("achievements", ["require", "exports", "construction", "prestige", "../lib/anime.min.js", "../lib/tabulator.min.js"], function (require, exports, ZIC, ZIP, anime, Tabulator) {
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
            if (ZIC.layers.length >= 3) {
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
            if (ZIC.zelocoin.greaterThanOrEqualTo("101")) {
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
            if (ZIC.zelocoin.greaterThanOrEqualTo(ZIC.scientificwhen)) {
                exports.achievement1.ainfo.achieved = true;
            }
        }
    });
    exports.achievement7 = new Achievement({
        name: "IDFB 1: Welcome Back",
        description: "Load your save",
        achieved: false,
        almost: false,
        announced: false
    }); // this achievement is completed in the construction.ts load function.
    exports.ae7 = new AchievementEffect({ effect: function () { } });
    exports.achievement2 = new Achievement({
        name: "Multi-level Madness",
        description: "Have 6 Layers",
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
    exports.achievement9 = new Achievement({
        name: "Zinc Battery",
        description: "Gain zinc.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae9 = new AchievementEffect({
        effect: function () {
            if (ZIP.zinc >= 1) { // make sure layer 5 is brought as that is when 6 shows up.
                exports.achievement9.ainfo.achieved = true;
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
    exports.achievement10 = new Achievement({
        name: "Zirconium Collecter",
        description: "Gain Zirconium.",
        achieved: false,
        almost: false,
        announced: false
    });
    exports.ae10 = new AchievementEffect({
        effect: function () {
            if (ZIP.zirconium >= 1) {
                exports.achievement10.ainfo.achieved = true;
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
            if (ZIC.zelocoin.greaterThanOrEqualTo("1e309")) {
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
define("construction", ["require", "exports", "../lib/break_infinity.min.js", "../lib/ad-notations.min.js", "achievements", "prestige"], function (require, exports, Decimal, ADNotations, ZIA, ZIP) {
    "use strict";
    exports.__esModule = true;
    exports.scientific = new ADNotations.ScientificNotation();
    exports.layers = [];
    exports.zelocoin = new Decimal(2);
    exports.ps = new Decimal(0);
    exports.buffer = new Decimal(0);
    exports.VERSION = "1.2";
    exports.SAVEVERSION = "1.0";
    exports.coinboost = new Decimal(1);
    exports.maxlayer = new Decimal(5);
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
    function LayerCheck(linfo) {
        if (exports.layers[linfo.id] == null && !exports.maxlayer.greaterThanOrEqualTo(exports.layers.length)) {
            window.alert("(temporary message) You've reached the max layer! Prestige to gain Zinc/Zirconium which will allow you to up the max layer limit.");
            return;
        }
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
            localStorage.setItem("coinboost", exports.coinboost);
            localStorage.setItem("maxlayer", exports.maxlayer);
            localStorage.setItem("zinc", ZIP.zinc);
            localStorage.setItem("zirconium", ZIP.zirconium);
            localStorage.setItem("achievements", JSON.stringify(ZIA.achievements));
            //console.log(ZIA.achievements);
            localStorage.setItem("completedAchievements", JSON.stringify(ZIA.completedAchievements));
            localStorage.setItem("theme", document.body.getAttribute("theme"));
            localStorage.setItem("version", exports.SAVEVERSION); // remember to change this each version	
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
            exports.coinboost = new Decimal(localStorage.getItem("coinboost"));
            exports.maxlayer = new Decimal(localStorage.getItem("maxlayer"));
            ZIP.LocalStoragePrestige();
            ZIA.ChangeAchievements(ZIA.achievements, JSON.parse(localStorage.getItem("achievements")));
            ZIA.ChangeAchievements(ZIA.completedAchievements, JSON.parse(localStorage.getItem("completedAchievements")));
            //console.log(ZIA.achievements);
            //console.log(JSON.parse(localStorage.getItem("achievements")));
            if (localStorage.getItem("theme") != "light") {
                document.getElementById("css").setAttribute("rel", "stylesheet");
                document.getElementById("css").setAttribute("href", "../lib/css/themes/" + localStorage.getItem("theme") + ".css");
            }
            document.getElementById("achievementbutton").innerHTML = "Achievements " + ZIA.completedAchievements.length + "/" + ZIA.achievements.length;
            UpdateZelocoins();
            if (localStorage.getItem("version") != exports.SAVEVERSION) {
                window.alert("The save-version your save is on is '" + localStorage.getItem("version") + "'although the current save-version is '" + exports.SAVEVERSION + "'. Things may/may not work in your save. (for example newly updated achievements wont be in your save.) In the future, to potentially fix this, press the save button to update the save-version.");
            }
            if (!ZIA.achievements[3].achieved) { // keep an eye out for this
                ZIA.achievements[3].achieved = true;
                console.log(ZIA.achievements[3].achieved);
                ZIA.AchievementCheck();
            }
        }
    }
    exports.Load = Load;
    function Tick() {
        exports.ps = exports.ps.minus(exports.ps);
        for (var i = exports.layers.length - 1; i >= 0; i--) {
            var flinfo = exports.layers[i].linfo;
            exports.buffer = exports.buffer.plus(flinfo.amount).times(exports.coinboost);
            //buffer = buffer.times(flinfo.amount**10); //quick and fast numbers, for debugging
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
        var clinfo = (DecimalFormat(linfo.cost)) ? exports.scientific.format(linfo.cost, 2, 0) : linfo.cost.toNumber();
        var alinfo = (DecimalFormat(linfo.amount)) ? exports.scientific.format(linfo.amount, 2, 0) : linfo.amount.toNumber();
        document.getElementById("layer" + linfo.id).innerHTML = "<b>" + alinfo + "</b><br>Layer " + linfo.id + "<br>" + clinfo + " Zelocoin";
    }
    exports.UpdateLayer = UpdateLayer;
    function UpdateZelocoins() {
        if (DecimalFormat(exports.zelocoin)) {
            document.getElementById("coin").innerHTML = exports.scientific.format(exports.zelocoin, 2, 0) + " zelocoins";
        }
        else {
            document.getElementById("coin").innerHTML = exports.zelocoin.toNumber() + " zelocoins";
        }
        if (DecimalFormat(exports.ps)) {
            document.getElementById("ps").innerHTML = "You are making " + exports.scientific.format(exports.ps, 2, 0) + " (" + Decimal.div(exports.ps, exports.zelocoin).times(100).toNumber().toFixed(2) + "%) zelocoins.";
        }
        else {
            document.getElementById("ps").innerHTML = "You are making " + exports.ps.toString() + " (" + Decimal.div(exports.ps, exports.zelocoin).times(100).toNumber().toFixed(2) + "%) zelocoins.";
        }
    }
    exports.UpdateZelocoins = UpdateZelocoins;
    function DecimalFormat(decimal) {
        if (decimal.greaterThanOrEqualTo(exports.scientificwhen)) {
            return true;
        }
        else {
            return false;
        }
        ;
    }
    exports.DecimalFormat = DecimalFormat;
    function PrestigeReset() {
        exports.zelocoin = exports.zelocoin.minus(exports.zelocoin).add(2);
        exports.ps = exports.ps.minus(exports.ps);
        exports.layers = [];
        document.getElementById("layer").innerHTML = "";
        exports.layers[0] = new Layer({ id: 1, cost: new Decimal(2), amount: new Decimal(0) });
    }
    exports.PrestigeReset = PrestigeReset;
    function CoinBoost(decimal) {
        exports.coinboost = exports.coinboost.plus(decimal);
    }
    exports.CoinBoost = CoinBoost;
    function MaxLevelChange(decimal) {
        exports.maxlayer = exports.maxlayer.plus(decimal);
    }
    exports.MaxLevelChange = MaxLevelChange;
});
define("script", ["require", "exports", "construction", "achievements", "prestige"], function (require, exports, ZIC, ZIA, ZIP) {
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
    saveButton.onclick = function () { ZIC.Save(); };
    document.getElementById("saving").appendChild(saveButton);
    saveButton.id = "savebutton";
    saveButton.innerHTML = "Save";
    var loadButton = document.createElement("button");
    loadButton.onclick = function () { ZIC.Load(); };
    document.getElementById("saving").appendChild(loadButton);
    loadButton.id = "loadbutton";
    loadButton.innerHTML = "Load";
    var interval = 0;
    window.setInterval(function () {
        interval++;
        ZIC.Tick();
        ZIP.UpdateGains();
        //ZIA.AlmostAchievementCheck();
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
        if (themes[themenum][0] != "light") {
            document.getElementById("css").setAttribute("rel", "stylesheet");
            document.getElementById("css").setAttribute("href", "../lib/css/themes/" + themes[themenum][0] + ".css");
        }
        else {
            document.getElementById("css").setAttribute("rel", "stylesheet alternate");
        }
        document.body.setAttribute("theme", themes[themenum][0]);
        themenum++;
    }
    console.log("Everything is good to go :)");
});
