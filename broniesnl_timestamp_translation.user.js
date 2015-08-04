// ==UserScript==
// @name         BroniesNL - Timestamp translation
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Translate timestamps on the subforum-screen
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewforum.php*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_timestamp_translation.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var tables = document.querySelectorAll('table.fborder');
var myTable = tables[1];
var rows = myTable.getElementsByTagName('tr');

for (var i=1; i<rows.length; i++){
    //intentionally skipping first one, thats the header-row.
    var tds = rows[i].getElementsByTagName('td');
    if (tds.length == 2){
        //Wrong row, this is an internal table.
        continue;
    }    
    processTd(tds[4]);
    processTd(tds[7]);
}

function processTd(myTd){
    var timeString = myTd.childNodes[2].nodeValue;
    console.log(timeString);    
    //Do some String-replacing to make JavaScript like the time-format.
    //Example: Tue Mar 17 2015, 02:18PM
    if (/PM/.test(timeString)){
        //Contains 'PM', so do 'hours+12'
        var hours = parseInt(/, \d\d/.exec(timeString)[0].substr(2,2));
        hours+=12;
        timeString = timeString.replace(/, \d\d/, ", " + hours);
    }
    timeString = timeString.replace(/PM/, "");
    timeString = timeString.replace(/AM/, "");
    var myDate = new Date(timeString);
    myTd.childNodes[2].nodeValue = myDate.toLocaleString();
}
