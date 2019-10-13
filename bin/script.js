define(["require", "exports", "./construction", "./achievements", "./prestige", "./alert", "./inventory", "../lib/break_infinity.min.js"], function (require, exports, ZIC, ZIA, ZIP, ZAL, ZIN, Decimal) {
    "use strict";
    exports.__esModule = true;
    exports.themes = [["light", "Light Theme"], ["dark", "Dark Theme"],
        ["hacker", "Hacker Theme"], ["modern", "Modern Theme"], ["minimal", "Minimal Theme"]];
    var themenum = 0;
    var tick = 1000;
    // document.body.setAttribute("theme",themes[themenum][0]);
    // let adisplay = document.getElementById("achievements").style.display; // achievement display
    var PrestigeCategory = new ZIC.Category({ id: "prestige", name: "Prestige!", color: "#9071e6" });
    exports.prestigecategoryalert = new ZAL.Alert({
        "function": function () { ZIP.LoadPrestigeCategory(); },
        categoryid: "prestige"
    });
    var PrestigeShopCategory = new ZIC.Category({ id: "prestigeshop", name: "Prestige Shop", color: "#8366d3" });
    exports.prestigeShopAlert = new ZAL.Alert({
        "function": function () { ZIP.LoadPrestigeShopCategory(); },
        categoryid: "prestigeshop"
    });
    var InventoryCategory = new ZIC.Category({ id: "inventory", name: "Inventory", color: "#73f368" });
    exports.InventoryCategoryAlert = new ZAL.Alert({
        "function": function () { ZIN.LoadInventory(); },
        categoryid: "inventory"
    });
    console.log(exports.InventoryCategoryAlert);
    var AchievementsCategory = new ZIC.Category({ id: "achievements", name: "Achievements 0/" + ZIA.achievements.length, color: "#6668d3" });
    exports.achievementsAlert = new ZAL.Alert({
        "function": function () { ZIA.LoadAchievements(); },
        categoryid: "achievements"
    });
    exports.changelogAlert = new ZAL.Alert({
        html: 'The Current version is 1.3. <span style="background-color: red">BETA 1</span><br><br>For the full changelog, go to <a target="_blank" href="changelog.txt"">the changelog</a>',
        elementid: "verisona"
    });
    exports.noticesAlert = new ZAL.Alert({
        html: 'Dont try playing this on IE...<br><br> \
	The #other div uses "-webkit-box". This is supported in most modern browsers, though Firefox needs to be on version 67+ Check if your browswer supports it at 	\
	<a target="_blank" href="https://caniuse.com/#feat=css-line-clamp">https://caniuse.com/#feat=css-line-clamp</a>.<br><br>										\
	The achievement & layer scrollbar now changes color and shape depending on																						\
	theme. This uses experimental webkit stuff so this may or may not show in 																						\
	your browser. If you use Chrome or Firefox or Safari (any browser that uses webkit), chances are it will work.<br><br>											\
	Want to help the development of this game? Goto <a target="_blank" href="https://github.com/Zolo101/zelocoin-incremental">https://github.com/Zolo101/zelocoin-incremental</a> and see what you could help me with! :)',
        elementid: "notices"
    });
    var closebutton = document.createElement("button");
    document.getElementById("category-container").appendChild(closebutton);
    closebutton.id = "close";
    closebutton.className = "category";
    closebutton.innerHTML = "X";
    closebutton.style.backgroundColor = "orangered";
    closebutton.onclick = function () { ZAL.CloseAlert(); };
    var maxLayers = new ZIC.Element({
        type: "p",
        id: "maxlayer",
        append: "other",
        innerHTML: "The Max Layer is " + ZIC.gamedata.maxlayer.toString()
    });
    //let br1 = new ZIC.Element({type: "br",append: "other"});
    var themeButton = new ZIC.Element({
        type: "select",
        id: "themeform",
        append: "other"
    }); // document.getElementById("themeform").onchange = function(){changeTheme(themenum)};
    for (var i = 0; i < exports.themes.length; i++) {
        var themeOption = new ZIC.Element({
            type: "option",
            append: "themeform",
            innerHTML: exports.themes[i][1]
        });
    }
    //console.log(ZIA.achievements);
    var br0 = new ZIC.Element({ type: "br", append: "other" });
    var achievementNotify = new ZIC.Element({
        type: "p",
        append: "other",
        id: "achievementnotify",
        innerHTML: "Achievement Completed: "
    });
    var saveButton = new ZIC.Element({
        type: "button",
        id: "savebutton",
        onclick: function () { ZIC.Save(); },
        append: "saving",
        innerHTML: "Save"
    });
    var loadButton = new ZIC.Element({
        type: "button",
        id: "loadbutton",
        onclick: function () { ZIC.AskLoad(); },
        append: "saving",
        innerHTML: "Load"
    });
    // let example = new ZIC.Element({
    // 	type: "p",
    // 	id: "example",
    // 	onclick: function(){console.log("Example")},
    // 	append: "game",
    // 	innerHTML: "Example"
    // });
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
    document.getElementById("themeform").addEventListener("change", function () {
        var selectElement = (document.getElementById("themeform"));
        var index = selectElement.selectedIndex;
        if (index != 0) {
            document.getElementById("css").setAttribute("rel", "stylesheet");
            document.getElementById("css").setAttribute("href", "../lib/css/themes/" + exports.themes[index][0] + ".css");
        }
        else {
            document.getElementById("css").setAttribute("rel", "stylesheet alternate");
        }
    });
    // INVENTORY ITEMS
    exports.zincboost = new Decimal(1.00);
    exports.zinc = new ZIN.InventoryItemClass({
        name: "Zinc",
        type: "resource",
        icon: "achievements/ZINCBATTERY",
        color: "lavender",
        description: "Each of this resource gives you a 1% increase in zelocoins.",
        amount: new Decimal(0),
        alwaysshow: true
    });
    exports.zirconium = new ZIN.InventoryItemClass({
        name: "Zirconium",
        type: "resource",
        icon: "achievements/ZIRCONIUMCOLLECTER",
        color: "blanchedalmond",
        description: "A resource mainly used in the prestige shop.",
        amount: new Decimal(0),
        alwaysshow: true
    });
    // prestige shop
    var maxlayer = new ZIP.PSButton({
        name: "+1 Max Layer",
        description: "Allows you to have more layers.",
        "function": function () { ZIC.MaxLayerChange(new Decimal(1)); },
        color: exports.zirconium.ic.color,
        cost: new Decimal(4),
        costresource: exports.zirconium
    });
    var x2ChildLayer = new ZIP.PSButton({
        name: "x2 Child Layers",
        description: "Choose a layer and it'll make 100% more child layers than what it used to",
        "function": function () {
            ZIC.AddPercentage(prompt("(temporary, hopefully) What layer would you like to choose? (Numbers)"), 1);
        },
        color: exports.zirconium.ic.color,
        cost: new Decimal(0),
        costresource: exports.zirconium
    });
    var extraPercentage = new ZIP.PSButton({
        name: "Extra Percentage",
        description: "Zinc will give an extra percentage in zelocoins.",
        "function": function () { exports.zincboost = exports.zincboost.plus(0.01); this.cost = this.cost.times(1e5); },
        color: exports.zirconium.ic.color,
        cost: new Decimal(1e5),
        costresource: exports.zirconium
    });
    function Zincc(iic, changeto) {
        exports.zinc.ic = changeto.ic;
    }
    exports.Zincc = Zincc;
    function Zirconiumc(iic, changeto) {
        exports.zirconium.ic = changeto.ic;
    }
    exports.Zirconiumc = Zirconiumc;
    // if (ZIC.VERSION) {
    // ZIC.Load(); // If there is a save, load it at the start of the game
    // ZIC.UpdateZelocoins();
    // }
    console.log("Everything is good to go :)");
});
