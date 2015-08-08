// ==UserScript==
// @name         BroniesNL - Collapse Posts
// @namespace    http://frankkie.nl/
// @version      0.4
// @description  hide posts from certain members, but you have the option to view anyway.
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewtopic.php?*
// @match        http://bronies.nl/usersettings.php*
// @downloadURL  https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/raw/master/broniesnl_collapse_posts.user.js
// @supportURL   https://github.com/frankkienl/BroniesNL-Tampermonkey-Scripts/
// ==/UserScript==

//Check if this is the Settings-page or Forum-page
//http://stackoverflow.com/questions/1034621/get-current-url-in-web-browser
var currentHref = window.location.href;
if (currentHref == "http://bronies.nl/usersettings.php" || currentHref == "http://bronies.nl/usersettings.php#"){
    //Add settings to this page 
    showSettings();
} else {
    //Collapse unwanted posts
    collapsePosts();
}

function showSettings(){
    //Hack our settings into forum-settings :P    
    var someRow = document.querySelector('form > div > table > tbody > tr');
    var myRow = document.createElement("TR"); //Make a TR to put our HTML in
    myRow.innerHTML = '<td class="forumheader3">Collapse names:<br />The usernames that will be hidden by default<br /><br /><small>This setting is part of the Collapse Post TamperMonkey script by FrankkieNL</small><td><input type="text" size="40" class="tbox" name="collapseNames" autocomplete="off" id="collapseNames" value="" /><br><small>usernames separated by ",". Example: Abcd,Bcde,Cdef</small><br /><a href="#" onClick="saveNamesToHideUnsafe(); return false;">Save</a>';
    insertAfter(myRow,someRow);

    //fill the input-box with previously set value
    var namesToHide = getNamesToHide();
    var ans = "";
    for (var i=0;i<namesToHide.length;i++){
        ans+=namesToHide[i]; 
        if (i!=namesToHide.length-1){
            ans+=",";
        }
    }
    document.getElementById('collapseNames').value=ans;

    console.log("Showing settings");
}

unsafeWindow.saveNamesToHideUnsafe = function(){saveNamesToHide();};

function saveNamesToHide(){
    var names = document.getElementById('collapseNames').value;
    localStorage.setItem("namesToHide",names);
    alert("Saved\n"+names);
}

function collapsePosts(){
    var namesToHide = getNamesToHide();
    var allNames = document.querySelectorAll('.forumheader > a > b');
    for (var i=0; i<allNames.length; i++){        
        //is it on the toHide-list?
        for (var j=0;j<namesToHide.length;j++){
            if (allNames[i].innerText == namesToHide[j]){
                //Yes, hide plz.
                var postHeaderTr = allNames[i].parentElement.parentElement.parentElement;
                //Add button to unhide the post
                var btnHere = postHeaderTr.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
                var btn = document.createElement('A');
                btn.className = "tbox npbutton"; //make in same style as the other buttons
                btn.style.textDecoration='none';
                //btn.href="#";            
                btn.id="collapseBtn"+i;
                btn.innerHTML="&nbsp;&nbsp;Show Post&nbsp;&nbsp;";
                btnHere.insertBefore(btn,btnHere.firstChild);         
                //find the next Tr, that contains the post
                var postTr = postHeaderTr.parentElement.rows[allNames[i].parentElement.parentElement.parentElement.rowIndex+1];
                postTr.style.display = 'none'; //hide post    
                postTr.id = "collapsed"+i;
                //Add behaviour to the button
                btn.addEventListener('click',createFunction(i)); //http://www.w3schools.com/js/js_htmldom_eventlistener.asp
            }
        }
    }
}

function getNamesToHide(){
    var ans = [];
    var names = localStorage.getItem("namesToHide");
    if (names == undefined || names == ""){
        return ans; //don't bother to parse when empty
    }
    //http://www.w3schools.com/jsref/jsref_split.asp
    var namesArr = names.split(",");
    for (var i=0;i<namesArr.length;i++){
        //http://stackoverflow.com/questions/351409/appending-to-array
        //http://www.w3schools.com/jsref/jsref_trim_string.asp
        ans.push(namesArr[i].trim()); //remove spaces in front and back
    }
    return ans; 
}

function createFunction(i){
    //yes this is needed, see:
    //http://stackoverflow.com/questions/750486/javascript-closure-inside-loops-simple-practical-example
    return function(){
        if (/hide/i.test(document.getElementById("collapseBtn"+i).innerHTML)){ //does the button say hide or show
            document.getElementById("collapsed"+i).style.display = 'none';
            document.getElementById("collapseBtn"+i).innerHTML="&nbsp;&nbsp;Show Post&nbsp;&nbsp;";
        } else {
            document.getElementById("collapsed"+i).style.display = 'table-row';
            document.getElementById("collapseBtn"+i).innerHTML="&nbsp;&nbsp;Hide Post&nbsp;&nbsp;";
        }
    };
}

function endsWith(str, suffix) {
    //http://stackoverflow.com/questions/280634/endswith-in-javascript
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function insertAfter(newNode, referenceNode) {
    //http://stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
