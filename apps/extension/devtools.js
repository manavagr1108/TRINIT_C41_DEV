var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools_page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
    // Handle responses from the background page, if any
    const data = chrome.devtools.network.getHAR();
    backgroundPageConnection.postMessage({
        tabId: message.tabId,
        data: data
    })
});

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
    tabId: chrome.devtools.inspectedWindow.tabId,
    scriptToInject: "./content_scripts/content.js"
});

// console.log("devtools")
// window.alert("devtools")
