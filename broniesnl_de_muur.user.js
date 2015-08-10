// ==UserScript==
// @name         BroniesNL - De muur
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Make a life-bar in the 'De Muur' thread
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php?205168.0
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_collapse_posts.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

//get current hp
var a = document.querySelector('span > strong.bbcode.bold');
var hp = /(\d+,?\d{0,3})/.exec(a.innerText)[0];
hp = hp.replace(/,/,"");

//make life-bar
var myCanvas = document.createElement('canvas');
myCanvas.id="myCanvas";
myCanvas.width=500;
myCanvas.height=50;
myCanvas.style.borderStyle='solid';
myCanvas.style.borderWidth='2px';
myCanvas.style.borderRadius='10px';
a.parentElement.insertBefore(myCanvas,a);
a.parentElement.insertBefore(document.createElement('br'),a);

//fill life-bar
var maxHp = 100000;
var barWidth = map(hp,0,maxHp,0,500);
var ctx = myCanvas.getContext("2d");
// Create gradient
var grd = ctx.createLinearGradient(0,0,500,0);
grd.addColorStop(0,"red");
grd.addColorStop(0.1,"orange");
grd.addColorStop(0.2,"yellow");
grd.addColorStop(0.3,"lime");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,barWidth,50);
// Draw HP
ctx.font = "30px Monospace";
ctx.fillStyle = "#000000";
ctx.textAlign="center";
ctx.fillText(hp + " / " + maxHp, 250,32);

function map(x,in_min,in_max,out_min,out_max)
{
    //https://www.arduino.cc/en/reference/map
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
