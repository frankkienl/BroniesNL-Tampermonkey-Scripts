// ==UserScript==
// @name         BroniesNL - Thread last page
// @namespace    http://frankkie.nl/
// @version      0.1
// @description  Instantly go to last page when clicking on a thread.
// @author       FrankkieNL
// @match        http://bronies.nl/e107_plugins/forum/forum_viewforum.php?*
// @grant        none
// ==/UserScript==

//find all Thread-links
var threadLinks = document.querySelectorAll("b > a");

for (var i=0; i<threadLinks.length; i++){
    //Find links to pages in this TD
    var myTd = threadLinks[i].parentElement.parentElement.parentElement;
    var links = myTd.getElementsByTagName('a');
    //Set ThreadLink.href to last-link-from-this-TD.href
    threadLinks[i].href=links[links.length-1].href;
}
