define(["require", "exports", "../lib/break_infinity.min.js", "../lib/ad-notations.min.js", "./achievements", "./script"], function (require, exports, Decimal, ADNotations, ZIA, ZIM) {
    "use strict";
    exports.__esModule = true;
    exports.scientific = new ADNotations.ScientificNotation();
    exports.layers = [];
    exports.gamedata = {
        zelocoin: new Decimal(2),
        ps: new Decimal(0),
        maxlayer: new Decimal(5),
        coinboost: new Decimal(1),
        prestiges: new Decimal(0)
    };
    exports.buffer = new Decimal(0);
    exports.VERSION = "1.3beta1";
    exports.SAVEVERSION = "1.1"; // when changes will disturb the saving/loading
    exports.pshopbuttons = [];
    exports.scientificwhen = new Decimal(1e+5);
    var Category = /** @class */ (function () {
        function Category(cinfo) {
            this.cinfo = cinfo;
            var categorybutton = document.createElement("button");
            document.getElementById("category-container").appendChild(categorybutton);
            categorybutton.id = "category" + cinfo.id;
            categorybutton.className = "category";
            categorybutton.innerHTML = cinfo.name;
            if (cinfo.color) {
                categorybutton.style.backgroundColor = cinfo.color;
            }
            if (cinfo.open || cinfo.open == false) {
                document.getElementById(cinfo.id).style.display = "none";
            }
        }
        return Category;
    }());
    exports.Category = Category;
    var Layer = /** @class */ (function () {
        function Layer(linfo) {
            this.linfo = linfo;
            linfo.percent = new Decimal(1);
            var layerbutton = document.createElement("button");
            document.getElementById("layer").appendChild(layerbutton);
            layerbutton.id = "layer" + linfo.id;
            layerbutton.innerHTML = "<b>" + linfo.amount + "</b><br>Layer " + linfo.id + "<br>" + DecimalFormat(linfo.cost) + " Zelocoin";
            layerbutton.onclick = function () { LayerCheck(linfo); };
        }
        return Layer;
    }());
    exports.Layer = Layer;
    var Element = /** @class */ (function () {
        function Element(ei) {
            this.ei = ei;
            var element = document.createElement(ei.type);
            if (ei.append) {
                document.getElementById(ei.append).appendChild(element);
            }
            if (ei.innerHTML) {
                element.innerHTML = ei.innerHTML;
            }
            if (ei.id) {
                element.id = ei.id;
            }
            if (ei.onclick) {
                element.onclick = ei.onclick;
            }
            if (ei["class"]) {
                element.className = ei["class"];
            }
        }
        return Element;
    }());
    exports.Element = Element;
    exports.layers[0] = new Layer({ id: 1, cost: new Decimal(2), amount: new Decimal(0) });
    function LayerCheck(linfo) {
        if (!exports.layers[linfo.id] && !exports.gamedata.maxlayer.greaterThanOrEqualTo(exports.layers.length)) {
            window.alert("You've reached the max layer! Increase the max layer in the Prestige Shop.");
            return;
        }
        if (exports.gamedata.zelocoin.greaterThanOrEqualTo(linfo.cost)) {
            exports.gamedata.zelocoin = exports.gamedata.zelocoin.minus(linfo.cost);
            linfo.amount = linfo.amount.plus(1);
            linfo.amount.toNumber();
            linfo.cost = linfo.cost.times(2);
            if (!exports.layers[linfo.id]) {
                exports.layers[linfo.id] = new Layer({ id: linfo.id + 1, cost: new Decimal(("1e+" + Number(linfo.id * 2))), amount: new Decimal(0) });
            }
            UpdateLayer(linfo);
            UpdateZelocoins();
        }
    }
    exports.LayerCheck = LayerCheck;
    function Save(auto) {
        //if (!auto) {
        if (window.confirm("Are you sure you want to save?")) {
            var selectElement = (document.getElementById("themeform"));
            var index = selectElement.selectedIndex;
            localStorage.setItem("gamedata", JSON.stringify(exports.gamedata));
            localStorage.setItem("layers", JSON.stringify(exports.layers));
            localStorage.setItem("zinc_Temp", JSON.stringify(ZIM.zinc));
            localStorage.setItem("zirconium_Temp", JSON.stringify(ZIM.zirconium));
            localStorage.setItem("achievements", JSON.stringify(ZIA.achievements));
            //console.log(ZIA.achievements);
            localStorage.setItem("completedAchievements", JSON.stringify(ZIA.completedAchievements));
            localStorage.setItem("theme", index.toString());
            localStorage.setItem("version", exports.SAVEVERSION); // remember to change this each version	
        }
        /*} else { // bad bad bad bad
            localStorage.setItem("layers",JSON.stringify(layers));
            localStorage.setItem("gamedata.zelocoin",gamedata.zelocoin);
            localStorage.setItem("gamedata.ps",gamedata.ps);
    
            localStorage.setItem("coinboost",coinboost);
            localStorage.setItem("maxlayer",maxlayer);
    
            localStorage.setItem("zinc",ZIP.zinc);
            localStorage.setItem("zirconium",ZIP.zirconium);
    
            localStorage.setItem("achievements",JSON.stringify(ZIA.achievements));
            //console.log(ZIA.achievements);
            localStorage.setItem("completedAchievements",JSON.stringify(ZIA.completedAchievements));
            localStorage.setItem("theme",document.body.getAttribute("theme"));
            localStorage.setItem("version",SAVEVERSION); // remember to change this each version
        }*/
    }
    exports.Save = Save;
    function AskLoad() {
        if (window.confirm("Are you sure you want to load?")) {
            Load();
        }
    }
    exports.AskLoad = AskLoad;
    function Load() {
        if (localStorage.getItem("version") != exports.SAVEVERSION) {
            window.alert("The save-version your save is on is '" + localStorage.getItem("version") + "', although the current save-version is '" + exports.SAVEVERSION + "'. Things may/may not work in your save. To fix this, press the save button to update the save-version.");
        }
        var selectElement = (document.getElementById("themeform"));
        var index = selectElement.selectedIndex;
        document.getElementById("layer").innerHTML = "";
        var zincP = JSON.parse(localStorage.getItem("zinc_Temp"));
        console.log(zincP);
        zincP.ic.amount = new Decimal(zincP.ic.amount);
        ZIM.Zincc(ZIM.zinc, zincP);
        var zirconiumP = JSON.parse(localStorage.getItem("zirconium_Temp"));
        console.log(zirconiumP);
        zirconiumP.ic.amount = new Decimal(zirconiumP.ic.amount);
        ZIM.Zirconiumc(ZIM.zirconium, zirconiumP);
        console.log(ZIM.zirconium);
        exports.gamedata = JSON.parse(localStorage.getItem("gamedata"));
        exports.gamedata.coinboost = new Decimal(exports.gamedata.coinboost);
        exports.gamedata.ps = new Decimal(exports.gamedata.ps);
        exports.gamedata.zelocoin = new Decimal(exports.gamedata.zelocoin);
        exports.gamedata.maxlayer = new Decimal(exports.gamedata.maxlayer);
        exports.layers = JSON.parse(localStorage.getItem("layers"));
        for (var i = 0; i < exports.layers.length; ++i) {
            exports.layers[i].linfo.amount = new Decimal(exports.layers[i].linfo.amount);
            exports.layers[i].linfo.cost = new Decimal(exports.layers[i].linfo.cost);
            if (document.getElementById("layer" + exports.layers[i].linfo.id) == null) {
                exports.layers[i] = new Layer({ id: exports.layers[i].linfo.id, cost: new Decimal(exports.layers[i].linfo.cost), amount: new Decimal(exports.layers[i].linfo.amount) });
                //console.log(layers[i].linfo);
            }
        }
        //ZIA.ChangeAchievements(ZIA.achievements,JSON.parse(localStorage.getItem("achievements")));
        ZIA.ChangeAchievements(ZIA.completedAchievements, JSON.parse(localStorage.getItem("completedAchievements")));
        //console.log(ZIA.achievements);
        //console.log(JSON.parse(localStorage.getItem("achievements")));
        // var pshop = JSON.parse(localStorage.getItem("pshop"));
        // for (let i = 0; i < pshopbuttons.length; ++i) {
        // 	pshopbuttons[i].psbinfo.cost = new Decimal(pshop[i]);
        // }
        if (localStorage.getItem("theme") != "0") {
            document.getElementById("css").setAttribute("rel", "stylesheet");
            document.getElementById("css").setAttribute("href", "../lib/css/themes/" + ZIM.themes[localStorage.getItem("theme")][0] + ".css");
        }
        document.getElementById("categoryachievements").innerHTML = "Achievements " + ZIA.completedAchievements.length + "/" + ZIA.achievements.length;
        UpdateZelocoins();
        if (!ZIA.achievements[3].achieved) { // keep an eye out for this
            ZIA.achievements[3].achieved = true;
            console.log(ZIA.achievements[3].achieved);
            ZIA.AchievementCheck();
        }
    }
    exports.Load = Load;
    function Tick() {
        exports.gamedata.ps = new Decimal(0);
        for (var i = exports.layers.length - 2; i >= 0; i--) {
            var flinfo = exports.layers[i].linfo;
            // let color1 = new Decimal(221)
            // let color2 = new Decimal(247);
            // let color1d = color1.div(flinfo.percent);
            // console.log(color1d.toString());
            // let color2d = color1.div(flinfo.percent);
            // console.log(color2d.toString());
            //console.log(flinfo);
            exports.buffer = exports.buffer.plus(flinfo.amount).times(flinfo.percent);
            //console.log("layer" + flinfo.id);
            // let gradient = "linear-gradient(0deg, rgba(" + color1d.toString() + ",221," + color1d.toString() + ",1) 0%, rgba(" + color2d.toString() + ",247," + color2d.toString() + ",1) 100%);";
            // document.getElementById("layer" + flinfo.id).style.background = gradient;
            //console.log(document.getElementById("layer" + flinfo.id).style.background);
            //buffer = buffer.times(flinfo.amount**10); //quick and fast numbers, for debugging
            if (i != exports.layers.length - 1) {
                //console.log(layers[i+1]);
                flinfo.amount = flinfo.amount.plus(exports.layers[i + 1].linfo.amount.times(exports.layers[i + 1].linfo.percent));
                // layers[i+1].linfo.amount = layers[i+1].linfo.amount.times(flinfo.percent);
            }
            UpdateLayer(flinfo);
        }
        // console.log(buffer);
        // console.log(layers);
        exports.gamedata.ps = exports.gamedata.ps.plus(exports.buffer).times(ZIM.zinc.ic.amount.div(100).plus(1)).times(ZIM.zincboost);
        exports.gamedata.zelocoin = exports.gamedata.zelocoin.plus(exports.gamedata.ps);
        UpdateZelocoins();
        exports.buffer = new Decimal(0);
    }
    exports.Tick = Tick;
    function UpdateLayer(linfo) {
        if (linfo.percent.gt(1)) {
            document.getElementById("layer" + linfo.id).innerHTML = "<span id='boost'>(⟵ x" + exports.df(linfo.percent) + ") </span><b>" + exports.df(linfo.amount) + "</b><br>Layer " + linfo.id + "<br>" + exports.df(linfo.cost) + " Zelocoin";
        }
        else {
            document.getElementById("layer" + linfo.id).innerHTML = "<b>" + exports.df(linfo.amount) + "</b><br>Layer " + linfo.id + "<br>" + exports.df(linfo.cost) + " Zelocoin";
        }
    }
    exports.UpdateLayer = UpdateLayer;
    function UpdateZelocoins() {
        document.getElementById("coin").innerHTML = exports.df(exports.gamedata.zelocoin.floor()) + " zelocoins";
        if (ZIM.zinc.ic.amount.eq(0)) {
            document.getElementById("ps").innerHTML = "You are making " + exports.df(exports.gamedata.ps) + " zelocoins.";
        }
        else {
            document.getElementById("ps").innerHTML = "You are making " + exports.df(exports.gamedata.ps) + " (x" + ZIM.zinc.ic.amount.div(100).plus(1).times(ZIM.zincboost).toFixed(2) + ") zelocoins.";
        }
    }
    exports.UpdateZelocoins = UpdateZelocoins;
    function DecimalFormat(decimal) {
        if (decimal.greaterThanOrEqualTo(exports.scientificwhen)) {
            return exports.scientific.format(decimal, 2, 0);
        }
        else {
            return decimal.toNumber();
        }
        ;
    }
    exports.DecimalFormat = DecimalFormat;
    function PrestigeReset() {
        exports.gamedata.zelocoin = new Decimal(2);
        exports.gamedata.ps = new Decimal(0);
        exports.layers = [];
        document.getElementById("layer").innerHTML = "";
        exports.layers[0] = new Layer({ id: 1, cost: new Decimal(2), amount: new Decimal(0) });
    }
    exports.PrestigeReset = PrestigeReset;
    function CoinBoost(decimal) {
        exports.gamedata.coinboost = exports.gamedata.coinboost.plus(decimal);
    }
    exports.CoinBoost = CoinBoost;
    function MaxLayerChange(decimal) {
        exports.gamedata.maxlayer = exports.gamedata.maxlayer.plus(decimal);
        document.getElementById("maxlayer").innerHTML = "The Max Layer is " + exports.gamedata.maxlayer.toString();
    }
    exports.MaxLayerChange = MaxLayerChange;
    function AddPercentage(num, add) {
        //console.log(Number(num)-1);
        //console.log(add);
        exports.layers[Number(num) - 1].linfo.percent = exports.layers[Number(num) - 1].linfo.percent.plus(add);
    }
    exports.AddPercentage = AddPercentage;
    function OpenCategory(cg) {
        document.getElementById(cg.cinfo.id).style.display = "block";
    }
    exports.OpenCategory = OpenCategory;
    function CloseCategory(cg) {
        document.getElementById(cg.cinfo.id).style.display = "none";
    }
    exports.CloseCategory = CloseCategory;
    exports.df = function (decimal) { return DecimalFormat(decimal); }; // shorthand
});
