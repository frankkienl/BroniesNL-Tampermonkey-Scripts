// ==UserScript==
// @name         BroniesNL - Remove Header
// @namespace    http://frankkie.nl/
// @version      0.4
// @description  Remove the huge header.
// @author       FrankkieNL
// @match        http://bronies.nl/*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_header_removal.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

//Remove the huge header
var headerDiv = document.getElementById('header');
var navigationDiv = document.getElementById('navigation');
navigationDiv.style.top='-28px';
headerDiv.style.height='10px';

//Remove the H2 that says '*CMC-logo* Forum'
var forumH2 = document.querySelector('h2');
forumH2.style.display='none';
