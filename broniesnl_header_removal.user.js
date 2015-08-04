// ==UserScript==
// @name         BroniesNL - Remove Header
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Remove the huge header.
// @author       FrankkieNL
// @match        http://bronies.nl/*
// @grant        none
// ==/UserScript==

// Github-link: https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_header_removal.user.js

//Remove the huge header
var headerDiv = document.getElementById('header');
var navigationDiv = document.getElementById('navigation');
navigationDiv.style.top=0;
headerDiv.style.height='auto';
