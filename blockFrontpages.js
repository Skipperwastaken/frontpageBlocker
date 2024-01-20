// ==UserScript==
// @name blockFrontpages
// @description Blocks the frontpages of sites
// @match *://*.reddit.com
// @match *://*.reddit.com/*
// @match https://*.youtube.com
// @match https://*.youtube.com/*
// @run-at document-start
// @version 0.0.2
// ==/UserScript==

const bannedPatterns = [
    /^https?:\/\/.*\.reddit\.com\/?$/,
    /^https?:\/\/.+\.reddit\.com\/r\/\w+\/?$/,
    /^https?:\/\/.+\.reddit\.com\/r\/\w+\/top\/?/,
    /^https?:\/\/www.youtube.com\/?$/
    ];

let url = window.location.href;

function block() // Function will block the website.
{
    var current = window.location.href;
    window.history.back(); // Attempt to go back (if it's opened in a tab with no tab history)
    if (window.location.href == current) // If it's still there
    {
        window.close(); // Attempt to close page
        if (window.location.href == current) // If it's still there (if it's the only tab)
        {
            window.location.href = "about://newtab"; // Go to a new tab; always works!
        }
    }
}

function check() {
    if(bannedPatterns.find(pattern => url.match(pattern))) {
        block();
    }
};

check();

setInterval(function() {
    if (url != location.href) {
        url = location.href;
        check();
    }
}, 500);