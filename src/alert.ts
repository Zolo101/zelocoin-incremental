import * as ZIC from "./construction"; // Zelo Incremental Classes and Functions File
import * as ZIN from "./inventory"; // Zelo Inventory File
import * as ZIA from "./achievements"; // Zelo Incremental Achievements File

export const alertdiv = document.getElementById("alert");
export var alertlist = []; // Where alert html is stored

export class Alert {
    constructor(public ainfo: AlertInfo) {
        ainfo.id = alertlist.length;
        alertlist.push(ainfo);
        //console.log(ainfo);
        //console.log(ainfo.id);
        if (ainfo.categoryid) {
            document.getElementById("category" + ainfo.categoryid).onclick = function(){OpenAlert(ainfo)};
        } else {
            document.getElementById(ainfo.elementid).onclick = function(){OpenAlert(ainfo)};
        }
    }
}

export interface AlertInfo {
    html?: any, // not really recommended
    function?: any, // the function that will run
    categoryid?: string, // for categorys
    elementid?: string, // for elements (eg <a>)
    id?: number // only if you really want to manually put it in
}

export function CloseAlert() {
	// anime({
	// 	targets: "#alert",
	// 	duration: 500,
	// 	opacity: 0,
	// })
    alertdiv.style.display = "none";
    alertdiv.removeAttribute("category");
}

export function ClearAlert() {
    alertdiv.innerHTML = "";
}

export function OpenAlert(ainfo: AlertInfo) {
    ClearAlert();
    alertdiv.style.display = "block";
    if (ainfo.categoryid) {
        alertdiv.setAttribute("category",alertlist[ainfo.id].categoryid);
    } else {
        alertdiv.setAttribute("category",alertlist[ainfo.id].elementid);
    }

    if (ainfo.function) {
        ainfo['function'](); // thank you ES6
    } else {
        alertdiv.innerHTML = alertlist[ainfo.id].html;
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