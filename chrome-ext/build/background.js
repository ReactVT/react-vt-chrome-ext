// load content script
chrome.tabs.executeScript({file: "content-script/script.js"}, function() {});
// Define virtualDOM variable
var webpageData;
// Define ports
var connections = {};
var panelId;
var contentscriptPort;

// handles incoming connections
chrome.runtime.onConnect.addListener(function(port) {
  //<-- connection to devtools d3tree
  var extensionListener = function (message, sender, sendResponse) {
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.name == "panelToBackgroundInit") {
      connections[message.tabId] = port;
      return;
    }
	// other message handling
  }
    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
  // connection to devtools d3tree -->

  // Store contentscript port in variable once contentscript->backgroundjs connection established
  if (port.name === 'contentscript-port') {
    contentscriptPort = port;
  }
  // listen for messages from content script and from panel
  port.onMessage.addListener(function(data) {
    // Backgroundjs receives virtualdom data from content script
    // relay webpage data to d3 panel with established panelID port
    if (data.type === 'virtualdom' || data.type === 'test-result') {
      webpageData = data;
      if (panelId) panelId.postMessage(webpageData);
    }
    // Establish connection from d3panel to backgroundjs
    else if (data.name === 'panelToBackgroundInit') {
      // Save port to panelID variable
      panelId = connections[data.tabId]
      // Relay virtualDOM data to d3panel after initial connection made
      panelId.postMessage(webpageData);
    }
    else if (data.type === 'assertion') {
      // Relay assertion data to content script
      // port = chrome.runtime.connect({name: "contentscript-port"});
      contentscriptPort.postMessage(data);
    }
  });
});