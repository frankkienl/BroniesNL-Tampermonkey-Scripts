// ==UserScript==
// @name         BroniesNL - Collapse Posts
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  hide posts from certain members, but you have the option to view anyway.
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php?*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_collapse_posts.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

var namesToHide = []; //fill in usernames here.
//I'm not posting usernames here for privacy-reasons.

var allNames = document.querySelectorAll('.forumheader > a > b');

for (var i=0; i<allNames.length; i++){        
    //is it on the toHide-list?
    for (var j=0;j<namesToHide.length;j++){
        if (allNames[i].innerText == namesToHide[j]){
            //Yes, hide plz.
            var postHeaderTr = allNames[i].parentElement.parentElement.parentElement;
            //Add button to unhide the post
            var btnHere = postHeaderTr.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
            var btnNode = document.createElement("BUTTON");
            var btnText = document.createTextNode("Show Post");
            btnNode.appendChild(btnText);
            btnHere.appendChild(btnNode);            
            //find the next Tr, that contains the post
            var postTr = postHeaderTr.parentElement.rows[allNames[i].parentElement.parentElement.parentElement.rowIndex+1];
            postTr.style.display = 'none'; //hide post    
            postTr.id = "collapsed"+i;
            //Add behaviour to the button
            btnNode.addEventListener('click',createFunction(i)); //http://www.w3schools.com/js/js_htmldom_eventlistener.asp
        }
    }
}

function createFunction(i){
    //yes this is needed, see:
    //http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    return function(){document.getElementById("collapsed"+i).style.display = 'table-row';};
}
