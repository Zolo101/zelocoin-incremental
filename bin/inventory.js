define(["require", "exports", "./construction", "../lib/break_infinity.min.js"], function (require, exports, ZIC, Decimal) {
    "use strict";
    exports.__esModule = true;
    exports.inventory = [];
    var InventoryItemClass = /** @class */ (function () {
        function InventoryItemClass(ic) {
            this.ic = ic;
            ic.amount = new Decimal(ic.amount);
            exports.inventory.push(ic);
        }
        return InventoryItemClass;
    }());
    exports.InventoryItemClass = InventoryItemClass;
    function LoadInventory() {
        var invdiv = new ZIC.Element({
            type: "div",
            id: "inventory",
            append: "alert"
        });
        var descriptiondiv = new ZIC.Element({
            type: "div",
            id: "inventoryDescription",
            append: "inventory"
        });
        var descriptiontitle = new ZIC.Element({
            type: "h2",
            id: "inventoryDescriptionTitle",
            append: "inventoryDescription",
            innerHTML: "Click an item to get started"
        });
        var descriptionicon = new ZIC.Element({
            type: "img",
            id: "inventoryDescriptionImage",
            append: "inventoryDescription"
        });
        var descriptiontext = new ZIC.Element({
            type: "p",
            id: "inventoryDescriptionText",
            append: "inventoryDescription"
        });
        var cellcontainerdiv = new ZIC.Element({
            type: "div",
            id: "cellInventory",
            append: "inventory"
        });
        var _loop_1 = function (i) {
            celldiv = new ZIC.Element({
                type: "div",
                id: "cell" + i,
                "class": "celldiv",
                append: "cellInventory",
                innerHTML: exports.inventory[i].name,
                onclick: function () { LoadCell(i); }
            });
            celldivamount = new ZIC.Element({
                type: "p",
                id: "cellamount" + i,
                "class": "celldivamount",
                append: "cell" + i,
                innerHTML: ZIC.df(exports.inventory[i].amount)
            });
            console.log(exports.inventory[i]);
            //console.log(inventory[i].amount);
            if (exports.inventory[i].color) {
                document.getElementById("cell" + i).style.backgroundColor = exports.inventory[i].color;
            }
        };
        var celldiv, celldivamount;
        //console.log(inventory.length);
        for (var i = 0; i < exports.inventory.length; i++) {
            _loop_1(i);
        }
        //console.log(ZIM.InventoryCategoryAlert);
        //console.log(htmlbuffer);
        //console.log(document.getElementById("inventory"));
        document.getElementById("inventory").appendChild(document.getElementById("cellInventory"));
        document.getElementById("alert").appendChild(document.getElementById("inventory"));
    }
    exports.LoadInventory = LoadInventory;
    function LoadCell(id) {
        document.getElementById("inventoryDescriptionTitle").innerHTML = exports.inventory[id].name;
        document.getElementById("inventoryDescriptionText").innerHTML = exports.inventory[id].description;
        document.getElementById("inventoryDescriptionImage").setAttribute("src", "../lib/img/" + exports.inventory[id].icon + ".png");
    }
    exports.LoadCell = LoadCell;
});
