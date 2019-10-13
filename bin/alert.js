define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.alertdiv = document.getElementById("alert");
    exports.alertlist = []; // Where alert html is stored
    var Alert = /** @class */ (function () {
        function Alert(ainfo) {
            this.ainfo = ainfo;
            ainfo.id = exports.alertlist.length;
            exports.alertlist.push(ainfo);
            //console.log(ainfo);
            //console.log(ainfo.id);
            if (ainfo.categoryid) {
                document.getElementById("category" + ainfo.categoryid).onclick = function () { OpenAlert(ainfo); };
            }
            else {
                document.getElementById(ainfo.elementid).onclick = function () { OpenAlert(ainfo); };
            }
        }
        return Alert;
    }());
    exports.Alert = Alert;
    function CloseAlert() {
        // anime({
        // 	targets: "#alert",
        // 	duration: 500,
        // 	opacity: 0,
        // })
        exports.alertdiv.style.display = "none";
        exports.alertdiv.removeAttribute("category");
    }
    exports.CloseAlert = CloseAlert;
    function ClearAlert() {
        exports.alertdiv.innerHTML = "";
    }
    exports.ClearAlert = ClearAlert;
    function OpenAlert(ainfo) {
        ClearAlert();
        exports.alertdiv.style.display = "block";
        if (ainfo.categoryid) {
            exports.alertdiv.setAttribute("category", exports.alertlist[ainfo.id].categoryid);
        }
        else {
            exports.alertdiv.setAttribute("category", exports.alertlist[ainfo.id].elementid);
        }
        if (ainfo["function"]) {
            ainfo['function'](); // thank you ES6
        }
        else {
            exports.alertdiv.innerHTML = exports.alertlist[ainfo.id].html;
        }
        //console.log(alertlist[ainfo.id].html);
        //console.log(ainfo);
        //console.log(ainfo.id);
        //console.log(alertlist);
        // anime({
        // 	targets: "#alert",
        // 	duration: 500,
        // 	opacity: 1
        // })
    }
    exports.OpenAlert = OpenAlert;
});
