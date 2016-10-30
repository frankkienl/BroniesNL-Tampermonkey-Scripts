// ==UserScript==
// @name         BroniesNL - Remove Signatures
// @namespace    http://frankkie.nl/
// @version      0.4
// @description  Remove all signatures on the forum
// @author       FrankkieNL
// @match        http*://bronies.nl/e107_plugins/forum/forum_viewtopic.php*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_signature_removal.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

//Signatures
var sigs = document.querySelectorAll('td > span.smalltext');
for (var i=0; i<sigs.length; i++){
  //The first one is '<< Previous thread | Next thread >>' btw.
  sigs[i].style.display='none';
}

//horizontal lines
var hrs = document.getElementsByTagName('hr');
for (var i=0; i<hrs.length;i++){hrs[i].style.display='none';}

//Author-info (like number of posts, location, etc.)
var ainfos = document.querySelectorAll('td > div.smalltext');
for (var i=1; i<ainfos.length; i++){
  //Intentionally skipping first one.
  //The first one is 'Track Thread'.
  
  //Don't remove the submit-button in polls!
  if (ainfos[i].getElementsByTagName('input').length!=0){
    continue;
  }
  
  ainfos[i].style.display='none';
}
