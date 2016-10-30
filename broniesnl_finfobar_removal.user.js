// ==UserScript==
// @name         BroniesNL - Finfobar removal
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  remove finfobar (bar below post)
// @author       FrankkieNL
// @match        http*://bronies.nl/e107_plugins/forum/forum_viewtopic.php?*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_finfobar_removal.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var finfos = document.getElementsByClassName('finfobar');
for (var i=0;i<finfos.length; i++){finfos[i].style.display='none';}
