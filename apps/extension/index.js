let sum = 0;
chrome.runtime.onConnect.addListener(function (devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  console.log("conneted");
  var devToolsListener = function (message, sender, sendResponse) {
    // Inject a content script into the identified tab
    console.log(message);
    if(message.data){
        sum+=message.data.request.bodySize + message.data.response.content.size
        console.log(sum);
    }
    if(message.scriptToInject !== undefined){
        devToolsConnection.postMessage({'tabId':message.tabId})
    }
  };
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function () {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});
console.log("manav");
