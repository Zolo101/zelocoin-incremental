define(["require", "exports", "./construction", "./achievements", "./prestige", "./alert", "../lib/break_infinity.min.js", "../lib/ad-notations.min.js"], function (require, exports, ZIC, ZIA, ZIP, ZAL, Decimal, ADNotations) {
    "use strict";
    exports.__esModule = true;
    exports.themes = [["light", "Light Theme"], ["dark", "Dark Theme"],
        ["hacker", "Hacker Theme"], ["modern", "Modern Theme"],
        ["minimal", "Minimal Theme"], ["darkmodern", "Dark Modern Theme"]];
    var themenum = 0;
    exports.notation = ["Mixed Scientific Notation", "Scientific Notation"];
    exports.usingNotation = new ADNotations.MixedScientificNotation();
    exports.tick = 50; // update tick
    exports.gtnth = 10; // gametick nth
    exports.gametick = exports.tick * exports.gtnth;
    // document.body.setAttribute("theme",themes[themenum][0]);
    // let adisplay = document.getElementById("achievements").style.display; // achievement display
    var LayerCategory = new ZIC.Category({ id: "layercategory", name: "Layers", color: "rgba(221,221,221,1)" });
    exports.layercateogryalert = new ZAL.Alert({
        "function": function () { ZIC.RespawnLayers(); },
        categoryid: LayerCategory.cinfo.id
    });
    var SettingsCategory = new ZIC.Category({ id: "settings", name: "Settings", color: "#8bb0a7" });
    exports.settingscategoryalert = new ZAL.Alert({
        "function": function () { OpenSettings(); },
        categoryid: SettingsCategory.cinfo.id
    });
    var AchievementsCategory = new ZIC.Category({ id: "achievements", name: "Achievements 0/" + ZIA.achievements.length, color: "#6668d3" });
    exports.achievementsAlert = new ZAL.Alert({
        "function": function () { ZIA.LoadAchievements(); },
        categoryid: AchievementsCategory.cinfo.id
    });
    var PrestigeCategory = new ZIC.Category({ id: "prestige", name: "Prestige!", color: "#9071e6" });
    exports.prestigecategoryalert = new ZAL.Alert({
        "function": function () { ZIP.LoadPrestigeCategory(); },
        categoryid: PrestigeCategory.cinfo.id
    });
    var ZincCategory = new ZIC.Category({ id: "zincshop", name: "Zinc", color: "lavender" });
    exports.ZincAlert = new ZAL.Alert({
        "function": function () { ZIP.LoadZincCategory(); },
        categoryid: ZincCategory.cinfo.id
    });
    function ChangeNotation(num) {
        if (num) {
            exports.usingNotation = new ADNotations.ScientificNotation();
        }
        else {
            exports.usingNotation = new ADNotations.MixedScientificNotation();
        }
    }
    exports.ChangeNotation = ChangeNotation;
    function OpenSettings() {
        var settings = new ZIC.Element({
            type: "div",
            id: "settings",
            append: "layer"
        });
        var saveButton = new ZIC.Element({
            type: "button",
            id: "savebutton",
            onclick: function () { ZIC.Save(); },
            append: "settings",
            innerHTML: "Save"
        });
        var loadButton = new ZIC.Element({
            type: "button",
            id: "loadbutton",
            onclick: function () { ZIC.AskLoad(); },
            append: "settings",
            innerHTML: "Load"
        });
        //let tickSlider = new ZIC.Element({
        //	type: "button",
        //	id: "tickslider",
        //	append: "settings",
        //	//onclick: function(){}
        //});
        //
        //let tickSilderP = new ZIC.Element({type:"p",id:"ticksliderp",append:"tickslider",innerHTML:"Update Tick (50ms)"});
        //
        //let tickSilderSilder = new ZIC.Element({
        //	type: "input",
        //	id: "ticksildersilder", // bruh
        //	append: "tickslider",
        //});
        //
        //let tss = (document.getElementById("ticksildersilder")) as HTMLInputElement;
        //tss.onchange = function(){document.getElementById("ticksliderp").innerHTML = "Update Tick (" + tss.value +"ms)"};
        //tss.setAttribute("type","range");
        //tss.setAttribute("min","50");
        //tss.setAttribute("max","500");
        //tss.setAttribute("value","50");
        //tick = Number(tss.value);
        //console.log(tick)
        var themeButton = new ZIC.Element({
            type: "select",
            id: "themeform",
            append: "settings"
        }); // document.getElementById("themeform").onchange = function(){changeTheme(themenum)};
        for (var i = 0; i < exports.themes.length; i++) {
            var themeOption = new ZIC.Element({
                type: "option",
                append: "themeform",
                innerHTML: exports.themes[i][1]
            });
        }
        var notationButton = new ZIC.Element({
            type: "select",
            id: "notationform",
            append: "settings"
        });
        for (var i = 0; i < exports.notation.length; i++) {
            var notationOption = new ZIC.Element({
                type: "option",
                append: "notationform",
                innerHTML: exports.notation[i]
            });
        }
        document.getElementById("notationform").addEventListener("change", function () {
            var selectElement = (document.getElementById("notationform"));
            var index = selectElement.selectedIndex;
            ChangeNotation(index);
        }); //usingNotation = new ADNotations[index](); would be better tbh
        document.getElementById("themeform").addEventListener("change", function () {
            var selectElement = (document.getElementById("themeform"));
            var index = selectElement.selectedIndex;
            if (index != 0) {
                document.getElementById("css").setAttribute("rel", "stylesheet");
                document.getElementById("css").setAttribute("href", "../lib/css/themes/" + exports.themes[index][0] + ".css");
                if (index == 2) {
                    if (!ZIA.achievements[11].achieved) { // keep an eye out for this
                        ZIA.achievements[11].achieved = true;
                        console.log(ZIA.achievements[11].achieved);
                        ZIA.AchievementCheck();
                    }
                }
            }
            else {
                document.getElementById("css").setAttribute("rel", "stylesheet alternate");
            }
        });
        var aboutdiv = new ZIC.Element({
            type: "div",
            id: "about",
            append: "settings",
            innerHTML: "<p id='version'>Made by Zelo101. <a id='verisona' href='changelog.html' target='_blank'>Version 1.3 <span style='background-color: #3a6960'>BETA 2</span> (click to see changelog)</a>, Inspired by <a target='_blank' href='https://ivark.github.io/'>Antimatter Dimensions</a><br>This game does not auto-save! <a id='notices' target='_blank' href='notices.txt'>[[Click for Notices]]</a></p>"
        });
    }
    //let closebutton = document.createElement("button");
    //document.getElementById("category-container").appendChild(closebutton);
    //closebutton.id = "close";
    //closebutton.className = "category";
    //closebutton.innerHTML = "X";
    //closebutton.style.backgroundColor = "orangered";
    //closebutton.onclick = function(){ZAL.CloseAlert()};
    var maxLayers = new ZIC.Element({
        type: "p",
        id: "maxlayer",
        append: "other",
        innerHTML: "The Max Layer is " + ZIC.gamedata.maxlayer.toString()
    });
    //let br1 = new ZIC.Element({type: "br",append: "other"});
    //console.log(ZIA.achievements);
    var br0 = new ZIC.Element({ type: "br", append: "other" });
    var achievementNotify = new ZIC.Element({
        type: "p",
        append: "other",
        id: "achievementnotify",
        innerHTML: "Achievement Completed: "
    });
    // let example = new ZIC.Element({
    // 	type: "p",
    // 	id: "example",
    // 	onclick: function(){console.log("Example")},
    // 	append: "game",
    // 	innerHTML: "Example"
    // });
    var gloop = 0;
    var aloop = 0;
    window.setInterval(function () {
        gloop++;
        aloop++;
        //console.log("egg1");
        ZIC.UpdatePS();
        //ZIA.AlmostAchievementCheck();
        if (gloop >= exports.gtnth) {
            gloop = 0;
            ZIC.Tick();
            ZIP.UpdateGains();
            //console.log("egg2");
        }
        if (aloop >= 100) {
            aloop = 0;
            ZIA.AchievementCheck();
            //console.log("egg3");
        }
    }, exports.tick);
    // INVENTORY ITEMS (LEGACY)
    exports.zincboost = new Decimal(1);
    //export var zinc = new ZIC.Resource({
    //	name: "Zinc",
    //	type: "resource",
    //	icon: "achievements/ZINCBATTERY",
    //	color: "lavender",
    //	description: "Each of this resource gives you a 1% increase in zelocoins.",
    //	amount: new Decimal(0),
    //	alwaysshow: true
    //})
    var zincsay = new ZIC.Element({
        type: "p",
        id: "zincsay",
        append: "other",
        innerHTML: "You have " + ZIC.df(ZIC.gamedata.resources.zinc) + " zinc."
    });
    // export var zirconium = new ZIN.InventoryItemClass({
    // 	name: "Zirconium",
    // 	type: "resource",
    // 	icon: "achievements/ZIRCONIUMCOLLECTER",
    // 	color: "blanchedalmond",
    // 	description: "A resource mainly used in the prestige shop.",
    // 	amount: new Decimal(0),
    // 	alwaysshow: true
    // })
    // prestige shop
    var maxlayer = new ZIP.PSButton({
        name: "+1 Max Layer",
        description: "Allows you to have more layers. (STACKABLE)",
        "function": function () {
            ZIC.MaxLayerChange(new Decimal(1));
            this.cost = this.cost.times(5);
        },
        color: "lavender",
        cost: new Decimal(1),
        costresource: ZIC.gamedata.resources.zinc
    });
    var x2ChildLayer = new ZIP.PSButton({
        name: "x2 Child Layers",
        description: "Choose a layer and it'll make 100% more child layers than what it used to. (STACKABLE)",
        "function": function () {
            var num = prompt("(temporary, hopefully) What layer would you like to choose? (Numbers)");
            if (num != undefined) {
                ZIC.AddPercentage(num, 1);
                this.cost = this.cost.times(20);
            }
            else {
                console.log("Cancelled Selection");
            }
        },
        color: "lavender",
        cost: new Decimal(1),
        costresource: ZIC.gamedata.resources.zinc
    });
    var extraPercentage = new ZIP.PSButton({
        name: "Extra Percentage",
        description: "Zinc will give an extra percentage in zelocoins. (STACKABLE)",
        "function": function () { exports.zincboost = exports.zincboost.plus(1); this.cost = this.cost.times(10); },
        color: "lavender",
        cost: new Decimal(1),
        costresource: ZIC.gamedata.resources.zinc
    });
    //if (ZIC.VERSION) {
    //	ZIC.Load(); // If there is a save, load it at the start of the game
    //	ZIC.UpdateZelocoins();
    //}
    console.log("Everything is good to go :)");
});
