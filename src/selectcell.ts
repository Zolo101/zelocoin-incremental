import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIA from "./achievements"; // Zelo Incremental Achievements File
import * as ZIP from "./prestige"; // Zelo Incremental Prestige File
import * as ZAL from "./alert"; // Zelo Alert File
import * as ZIN from "./inventory"; // Zelo Inventory File
import * as ZIM from "./script"; // Zelo Incremental Main File
export var selecting = false;

export function EnableSelectLayer() {
    selecting = true;
    let selectionp = new ZIC.Element({
        type: "p",
        id: "selection",
        append: "resource-container",
        innerHTML: "Please select a layer."
    })
}