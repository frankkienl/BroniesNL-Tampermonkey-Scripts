// ==UserScript==
// @name         BroniesNL - Thread first and last page buttons
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Add first and last page buttons to thread
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php*
// @grant        none
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_first_last_page_buttons.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

go();

function go(){
    var selectBox = document.querySelector('select');
    if (selectBox.name == "forumjump"){
        return; //This thread has only 1 page    
    }
    //check if first page button has to be made
    if (selectBox.options[0].selected){
        //we are already on the first page, so no.
    } else {
        //we are not on the first page, make buton        
        var btn = document.createElement('A');
        btn.className = "tbox npbutton"; //make in same style as the other buttons
        btn.style.textDecoration='none';
        btn.href=selectBox.options[0].value;
        btn.innerHTML="&nbsp;&nbsp;|<&nbsp;&nbsp;";
        //add to page
        selectBox.parentElement.insertBefore(btn,selectBox.parentElement.firstChild.nextSibling);        
    }
    //check if last page button has to be made
    if (selectBox.options[selectBox.options.length-1].selected){
        //we are already on the last page, so no.
    } else {
        //we are not on the first page, make buton        
        var btn = document.createElement('A');
        btn.className = "tbox npbutton"; //make in same style as the other buttons
        btn.style.textDecoration='none';
        btn.href=selectBox.options[selectBox.options.length-1].value;
        btn.innerHTML="&nbsp;&nbsp;>|&nbsp;&nbsp;";
        //add to page
        selectBox.parentElement.insertBefore(btn,selectBox.nextSibling.nextSibling.nextSibling);      
    }
}
