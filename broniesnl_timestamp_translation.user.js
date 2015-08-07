// ==UserScript==
// @name         BroniesNL - Timestamp translation
// @namespace    http://frankkie.nl/
// @version      0.6
// @description  Translate timestamps on the subforum-screen
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewforum.php*
// @match        http://bronies.nl/e107_plugins/forum/forum.php*
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_timestamp_translation.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var addTimeAgo = true;

var dayNamesLongNL = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
var dayNamesShortNL = ["zo", "ma","di","wo","do","vr","za"];
var monthNamesLongNL = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
var monthNamesShortNL = ["jan", "feb", "maa", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

var myBody = document.querySelector('body');

var textNodes = textNodesUnder(myBody);
for (var i = 0; i < textNodes.length; i++){
    processTextNode(textNodes[i]);
}

function textNodesUnder(el){
    //http://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

function processTextNode(textNode){
    //Example: Tue Mar 17 2015, 02:18PM
    if (!/[A-Z][a-z][a-z]\s[A-Z][a-z][a-z]\s\d*\s\d*,\s\d\d:\d\d[A-Z][A-Z]/.test(textNode.nodeValue)){
        //Not what we're looking for        
        return;
    }
    var timeString = /[A-Z][a-z][a-z]\s[A-Z][a-z][a-z]\s\d*\s\d*,\s\d\d:\d\d[A-Z][A-Z]/.exec(textNode.nodeValue)[0];
    //Do some String-replacing to make JavaScript like the time-format.
    if (/PM/.test(timeString)){
        //Contains 'PM', so do 'hours+12'
        var hours = parseInt(/, \d\d/.exec(timeString)[0].substr(2,2));
        if (hours<12){
            //note: times like 12:05PM should not be +12-ed.
            hours+=12;
        }
        timeString = timeString.replace(/, \d\d/, ", " + hours);
    } else if (/AM/.test(timeString)){ //wait.. is else-if needed here? meh.
        var hours = parseInt(/, \d\d/.exec(timeString)[0].substr(2,2));
        if (hours==12){
            //note: times like 12:05AM should be 00:05AM
            hours=0;
        }
        timeString = timeString.replace(/, \d\d/, ", " + hours);
    }
    timeString = timeString.replace(/PM/, "");
    timeString = timeString.replace(/AM/, "");
    var myDate = new Date(timeString);
    //Now we have the date, now turn it into something readable.

    var goodTimeString = dayNamesShortNL[myDate.getDay()] + " " + myDate.getDate() + " " + monthNamesShortNL[myDate.getMonth()]
    + " " + myDate.getFullYear() + " " + addZero(myDate.getHours()) + ":" + addZero(myDate.getMinutes());

    if (addTimeAgo){
        goodTimeString += " (" + timeAgo(myDate) + ")";
    }

    //Just replace the timestamp, don't override other text in that node.
    textNode.nodeValue = textNode.nodeValue.replace(/[A-Z][a-z][a-z]\s[A-Z][a-z][a-z]\s\d*\s\d*,\s\d\d:\d\d[A-Z][A-Z]/,goodTimeString);
}

function addZero(number){
    number = parseInt(number);
    if (number < 10){
        return "0" + number;
    } else {
        return number;
    }
}

function timeAgo(date){
    //http://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + " jaar geleden";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        if (interval == 1){
            return "1 maand geleden";
        } else {
            return interval + " maanden geleden";
        }
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " dagen geleden";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " uur geleden";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        if (interval == 1){
            return "1 minuut geleden";
        } else {
            return interval + " minuten geleden";
        }
    }
    return Math.floor(seconds) + " seconden geleden";
}
