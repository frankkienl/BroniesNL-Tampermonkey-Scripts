// ==UserScript==
// @name         BroniesNL - SubForumName larger
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Enlarge the name of the current subforum
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewforum.php?*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_subforumname_larger.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var a = document.querySelector(".forumheader");
a.style.fontSize = 'x-large';
