// ==UserScript==
// @name         BroniesNL - Remove Signatures
// @namespace    http://frankkie.nl/
// @version      0.3
// @description  Remove all signatures on the forum
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_signature_removal.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

// Github-link: https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_signature_removal.user.js

//Signatures and stuff below avatar
var smalls = document.getElementsByClassName('smalltext');
for (var i=0; i<smalls.length; i++){smalls[i].style.display='none';}

//horizontal lines
var hrs = document.getElementsByTagName('hr');
for (var i=0; i<hrs.length;i++){hrs[i].style.display='none';}
