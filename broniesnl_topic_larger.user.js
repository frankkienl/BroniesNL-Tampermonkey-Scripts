// ==UserScript==
// @name         BroniesNL - Topic larger
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Make the topic of the thread larger.
// @author       You
// @match        http*://bronies.nl/e107_plugins/forum/forum_viewtopic.php?*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_topic_larger.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var a = document.querySelector(".forumheader[colspan='3']");
a.style.fontSize='x-large';
