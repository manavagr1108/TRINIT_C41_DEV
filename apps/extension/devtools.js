var backgroundPageConnection = chrome.runtime.connect({
  name: "devtools_page",
});

backgroundPageConnection.onMessage.addListener(async function (message) {
  // Handle responses from the background page, if any
  // const data = await chrome.devtools.network;
  let network = await chrome.devtools.network;
  let data;
  await chrome.devtools.network.onRequestFinished.addListener(function (req) {
    data = req;

    // window.alert(Object.keys(req));
    backgroundPageConnection.postMessage({
        tabId: message.tabId,
        data:data
    });
  });
});

// Relay the tab ID to the background page
backgroundPageConnection.postMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "./content_scripts/content.js",
});

// console.log("devtools")
// window.alert("devtools")
