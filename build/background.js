// load content script
chrome.tabs.executeScript({file: "content-script/script.js"}, function() {
        console.log("content script loaded");
      });

var connections = {};
var virtualDOM;
var bgToScriptPort;
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
  //connection to devtools d3tree -->
  // if port is content-panel port, keep reference to it at bgToScriptPort
  if (port.name === 'contentscript-port') bgToScriptPort = port;

  // listen for messages from content script and from panel
  port.onMessage.addListener(function(data) {
    // contentscript -> background: traversed DOM data
    // store data in virtualDOM to be sent after panel->background connection is made
    if (data.type === 'virtualdom') virtualDOM = data;
    // establishing panel -> background connection
    else if (data.name === 'panelToBackgroundInit') connections[data.tabId].postMessage(virtualDOM);
    // after receiving assertion object from panel -> backgroundjs
    // relay/send to content script
    else if (data.type === 'assertion') bgToScriptPort.postMessage(data);
  });
});