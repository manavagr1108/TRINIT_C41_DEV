chrome.runtime.onConnect.addListener(function (devToolsConnection) {
  // assign the listener function to a variable so we can remove it later
  console.log("conneted");
  var devToolsListener = function (message, sender, sendResponse) {
    // Inject a content script into the identified tab
    console.log(message);
    if(message.scriptToInject !== undefined){
        // chrome.scripting.executeScript({
        //     target : {tabId : message.tabId},
        //     files : [ message.scriptToInject ],
        //   });
          sendResponse({tabId:message.tabId})
    }
  };
  // add the listener
  devToolsConnection.onMessage.addListener(devToolsListener);

  devToolsConnection.onDisconnect.addListener(function () {
    devToolsConnection.onMessage.removeListener(devToolsListener);
  });
});
console.log("manav");
