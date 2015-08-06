// ==UserScript==
// @name         BroniesNL - Thread first and last page buttons
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Add first and last page buttons to thread
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewforum.php?7
// @grant        none
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
        //TODO: make button
    }
}
