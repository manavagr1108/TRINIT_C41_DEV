let sum = [];
chrome.runtime.onConnect.addListener(function (devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  var devToolsListener = function (message, sender, sendResponse) {
    // Inject a content script into the identified tab
    sum.find(d => {
      if (d.tabId === message.tabId) {
        d.sum += message.data.request.bodySize + message.data.response.content.size
        const reg = message.data._initiator.url.match(/http?s:\/\/[A-Za-z0-9.]*/);
        d.url = reg;
        console.log(d);
      }
    })
    if (message.scriptToInject !== undefined) {
      devToolsConnection.postMessage({ 'tabId': message.tabId })
      sum.push({
        tabId: message.tabId,
        url: "",
        sum: 0
      })
    }
  };
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function () {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});

chrome.tabs.onRemoved.addListener((tabId) => {
  fetch(
    'http://localhost:4000/storeData', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tabId: tabId,
      sum: sum,
    })
  }
  ).then((data) => console.log(data)).catch((err) => console.log(err));
})
