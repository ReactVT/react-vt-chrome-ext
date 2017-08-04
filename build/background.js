// load content script
chrome.tabs.executeScript({file: "content-script/script.js"}, function() {
        console.log("content script loaded");
      });
// Define virtualDOM variable
var virtualDOM;
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
    console.log('found contentscript port');
    contentscriptPort = port;
  }
  // listen for messages from content script and from panel
  port.onMessage.addListener(function(data) {
    console.log('background received message', data);
    // Backgroundjs receives virtualdom data from content script
    // relay virtualDOM data to d3 panel with established panelID port
    if (data.type === 'virtualdom') {
      virtualDOM = data;
      if (panelId) panelId.postMessage(virtualDOM);
    }
    // Establish connection from d3panel to backgroundjs
    else if (data.name === 'panelToBackgroundInit') {
      // Save port to panelID variable
      panelId = connections[data.tabId]
      console.log('checking connection', connections);
      // Relay virtualDOM data to d3panel after initial connection made
      panelId.postMessage(virtualDOM);
    }
    else if (data.type === 'assertion') {
      // Relay assertion data to content script
      // port = chrome.runtime.connect({name: "contentscript-port"});
      console.log('in assertion condtional', port)
      contentscriptPort.postMessage(data);
    }
  });
});
