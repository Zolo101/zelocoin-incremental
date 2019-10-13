import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIM from "./script"; // Zelo Incremental Main File
import * as ZAL from "./alert"; // Zelo Alert File

import Decimal = require("../lib/break_infinity.min.js");
import ADNotations = require("../lib/ad-notations.min.js");

export var inventory = [];

export class InventoryItemClass {
    constructor(public ic: InventoryItem) {
        ic.amount = new Decimal(ic.amount);
        inventory.push(ic);
    }
}

interface InventoryItem {
    name: string,
    type: string, // if it is an useable item, a use button should apppear
    icon?: string, // not done yet, maybe in 1.14?
    color?: string,
    description?: string,
    amount?: any,
    alwaysshow?: boolean, // true for the item to always show, regardless of amount
}

export function LoadInventory() {
    let invdiv = new ZIC.Element({ // Inventory Div
        type: "div",
        id: "inventory",
        append: "alert",    
    })

    let descriptiondiv = new ZIC.Element({
        type: "div",
        id: "inventoryDescription",
        append: "inventory",
    })

    let descriptiontitle = new ZIC.Element({
        type: "h2",
        id: "inventoryDescriptionTitle",
        append: "inventoryDescription",
        innerHTML: "Click an item to get started",
    })

    let descriptionicon = new ZIC.Element({
        type: "img",
        id: "inventoryDescriptionImage",
        append: "inventoryDescription",
    })

    let descriptiontext = new ZIC.Element({
        type: "p",
        id: "inventoryDescriptionText",
        append: "inventoryDescription",
    })

    let cellcontainerdiv = new ZIC.Element({
        type: "div",
        id: "cellInventory",
        append: "inventory",
    })

    //console.log(inventory.length);
    for (let i = 0; i < inventory.length; i++) {
        var celldiv = new ZIC.Element({
            type: "div",
            id: "cell" + i,
            class: "celldiv",
            append: "cellInventory",
            innerHTML: inventory[i].name,
            onclick: function(){LoadCell(i)},
        });
        var celldivamount = new ZIC.Element({
            type: "p",
            id: "cellamount" + i,
            class: "celldivamount",
            append: "cell" + i,
            innerHTML: ZIC.df(inventory[i].amount),
        })
        console.log(inventory[i]);
        //console.log(inventory[i].amount);
        if (inventory[i].color) {
            document.getElementById("cell" + i).style.backgroundColor = inventory[i].color;   
        }
        //console.log(celldiv);
    }

    //console.log(ZIM.InventoryCategoryAlert);
    //console.log(htmlbuffer);
    //console.log(document.getElementById("inventory"));
    document.getElementById("inventory").appendChild(document.getElementById("cellInventory"));

    document.getElementById("alert").appendChild(document.getElementById("inventory"));
}

export function LoadCell(id: number) { // id = where in the inventory list the cell is in
    document.getElementById("inventoryDescriptionTitle").innerHTML = inventory[id].name;
    document.getElementById("inventoryDescriptionText").innerHTML = inventory[id].description;
    document.getElementById("inventoryDescriptionImage").setAttribute("src","../lib/img/" + inventory[id].icon + ".png");
}
