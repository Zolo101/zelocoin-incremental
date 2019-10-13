define(["require", "exports", "./construction", "./achievements", "./script", "./alert", "../lib/anime.min.js", "../lib/break_infinity.min.js"], function (require, exports, ZIC, ZIA, ZIM, ZAL, anime, Decimal) {
    "use strict";
    exports.__esModule = true;
    exports.zincPotential = new Decimal(0); // UpdateGains();
    exports.zirconiumPotential = new Decimal(0); // UpdateGains();
    exports.layerUpButtonCost = new Decimal(4); // UpdateLayerUpButton();
    //export var zinc_format = ZIC.DecimalFormat(zinc) ? ZIC.scientific.format(zinc,2,0) : zinc.toNumber();
    //export var zirconium_format = ZIC.DecimalFormat(zirconium) ? ZIC.scientific.format(zirconium,2,0) : zirconium.toNumber();
    var PSButton = /** @class */ (function () {
        function PSButton(PSBInfo) {
            this.PSBInfo = PSBInfo;
            PSBInfo.id = ZIC.pshopbuttons.length;
            ZIC.pshopbuttons.push(PSBInfo);
        }
        return PSButton;
    }());
    exports.PSButton = PSButton;
    function LoadPrestigeCategory() {
        var prestigediv = new ZIC.Element({
            type: "div",
            id: "prestigediv",
            append: "alert"
        });
        var prestigetext = new ZIC.Element({
            type: "p",
            id: "prestigetext",
            append: "prestigediv",
            innerHTML: "By prestiging you will gain 0 Zinc & 0 Zirconium."
        });
        var prestigebutton = new ZIC.Element({
            type: "button",
            id: "prestigedivbutton",
            append: "prestigediv",
            innerHTML: "Prestige!",
            onclick: function () { Prestige(); }
        });
        document.getElementById("alert").appendChild(document.getElementById("prestigediv"));
    }
    exports.LoadPrestigeCategory = LoadPrestigeCategory;
    function LoadPrestigeShopCategory() {
        var shopitemdiv = new ZIC.Element({
            type: "div",
            id: "pshop",
            append: "alert"
        });
        var shopitemhelp = new ZIC.Element({
            type: "h2",
            id: "pshophelp",
            append: "pshop",
            innerHTML: "Click to see the description of an item. (Shift-click an item to buy it)"
        });
        var _loop_1 = function (i) {
            var shopitem = new ZIC.Element({
                type: "div",
                id: "psdiv" + i,
                "class": "psdiv",
                append: "pshop",
                onclick: function () { LoadPSItem(ZIC.pshopbuttons[i]); }
            });
            var shopitemtitle = new ZIC.Element({
                type: "p",
                id: "psdivtitle" + i,
                "class": "psdivtitle",
                append: "psdiv" + i,
                innerHTML: ZIC.pshopbuttons[i].name
            });
            var shopitemcost = new ZIC.Element({
                type: "p",
                id: "psdivcost" + i,
                "class": "psdivscost",
                append: "psdiv" + i,
                innerHTML: ZIC.df(ZIC.pshopbuttons[i].cost) + " " + ZIC.pshopbuttons[i].costresource.ic.name
            });
            if (ZIC.pshopbuttons[i].color) {
                document.getElementById("psdiv" + i).style.backgroundColor = ZIC.pshopbuttons[i].color;
            }
        };
        for (var i = 0; i < ZIC.pshopbuttons.length; i++) {
            _loop_1(i);
        }
        // document.getElementById("pshop").style.backgroundColor = "#7a6f99";
        document.getElementById("alert").appendChild(document.getElementById("pshop"));
    }
    exports.LoadPrestigeShopCategory = LoadPrestigeShopCategory;
    function Prestige() {
        if (window.confirm("Are you sure you want to Prestige? You will lose your zelocoins & layers.")) {
            console.log(ZIM.zirconium.ic.amount);
            ZIM.zinc.ic.amount = ZIM.zinc.ic.amount.plus(exports.zincPotential);
            ZIM.zirconium.ic.amount = ZIM.zirconium.ic.amount.plus(exports.zirconiumPotential);
            exports.zincPotential = new Decimal(0);
            exports.zirconiumPotential = new Decimal(0);
            ZIC.CoinBoost(ZIM.zinc.ic.amount);
            //console.log(ZIC.coinboost);
            ZIC.PrestigeReset();
            if (!ZIA.achievements[4].achieved) { // Prestige achievement
                ZIA.achievements[4].achieved = true;
                console.log(ZIA.achievements[4].achieved);
                ZIA.AchievementCheck();
            }
            if (!ZIA.achievements[11].achieved) {
                if (ZIC.gamedata.prestiges.gte(5)) {
                    ZIA.achievements[11].achieved = true;
                    ZIA.AchievementCheck();
                }
            }
            console.log("Prestige'd");
            ZAL.CloseAlert();
            anime({
                targets: "#categoryprestige",
                backgroundColor: "rgb(46,139,87)",
                duration: 2000,
                direction: "alternate"
            });
        }
    }
    exports.Prestige = Prestige;
    function UpdateGains() {
        var zinc_zero = ZIC.df(exports.zincPotential);
        var zirconium_zero = ZIC.df(exports.zirconiumPotential);
        var zinc_format = ZIC.df(ZIM.zinc.ic.amount);
        var zirconium_format = ZIC.df(ZIM.zirconium.ic.amount);
        exports.zincPotential = new Decimal(0);
        exports.zirconiumPotential = new Decimal(0);
        exports.zincPotential = exports.zincPotential.add(ZIC.gamedata.zelocoin.e).floor(); // dividedBy(1e+10)
        exports.zirconiumPotential = exports.zirconiumPotential.add(ZIC.gamedata.ps).dividedBy(1e+8).floor();
        if (document.getElementById("alert").getAttribute("category") == (ZIM.prestigecategoryalert.ainfo.categoryid)) {
            UpdatePrestigeElements();
        }
    }
    exports.UpdateGains = UpdateGains;
    function UpdatePrestigeElements() {
        document.getElementById("prestigetext").innerHTML = "By prestiging you will gain " + ZIC.df(exports.zincPotential) + " Zinc & " + ZIC.df(exports.zirconiumPotential) + " Zirconium.";
    }
    exports.UpdatePrestigeElements = UpdatePrestigeElements;
    function LoadPSItem(PSBI) {
        var itemid = "psdiv" + PSBI.id;
        var item = document.getElementById(itemid);
        var itemtitle = document.getElementById("psdivtitle" + PSBI.id);
        var itemcost = document.getElementById("psdivcost" + PSBI.id);
        if (!PSBI.open) {
            PSBI.open = true;
            item.style.position = "absolute";
            item.style.width = "90%";
            item.style.height = "60%";
            itemtitle.style.fontSize = "calc(40px + 0.5vw)";
            itemcost.style.fontSize = "calc(25px + 0.5vw)";
            var psdivdescription = new ZIC.Element({
                type: "p",
                id: "psdivdesc" + PSBI.id,
                "class": "psdivdesc",
                append: itemid,
                innerHTML: PSBI.description
            });
            var psdivbuy = new ZIC.Element({
                type: "button",
                id: "psdivbutton" + PSBI.id,
                "class": "psdivbutton",
                append: itemid,
                onclick: function () {
                    //PSBI.function();
                    //console.log(PSBI.costresource.ic.amount);
                    //console.log(PSBI.cost);
                    if (PSBI.costresource.ic.amount.greaterThanOrEqualTo(PSBI.cost)) {
                        PSBI.costresource.ic.amount.minus(PSBI.cost);
                        PSBI["function"]();
                        anime({
                            targets: item,
                            background: "rgb(152,251,152)",
                            duration: 2000,
                            easing: "easeOutCirc",
                            direction: "alternate"
                        });
                        itemcost.innerHTML = ZIC.df(ZIC.pshopbuttons[PSBI.id].cost) + " " + ZIC.pshopbuttons[PSBI.id].costresource.ic.name;
                    }
                    else {
                        anime({
                            targets: item,
                            background: "rgb(250,128,114)",
                            duration: 2000,
                            easing: "easeOutCirc",
                            direction: "alternate"
                        });
                    }
                },
                innerHTML: "Buy!"
            });
        }
        else {
            PSBI.open = false;
            document.getElementById("psdivdesc" + PSBI.id).remove();
            document.getElementById("psdivbutton" + PSBI.id).remove();
            itemcost.style.fontSize = "initial";
            itemtitle.style.fontSize = "initial";
            item.style.position = "initial";
            item.style.width = "calc(96px + 1vw)";
            item.style.height = "calc(64px + 1vw)";
        }
    }
    exports.LoadPSItem = LoadPSItem;
});
