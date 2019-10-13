define(["require", "exports", "./construction"], function (require, exports, ZIC) {
    "use strict";
    exports.__esModule = true;
    exports.selecting = false;
    function EnableSelectLayer() {
        exports.selecting = true;
        var selectionp = new ZIC.Element({
            type: "p",
            id: "selection",
            append: "resource-container",
            innerHTML: "Please select a layer."
        });
    }
    exports.EnableSelectLayer = EnableSelectLayer;
});
