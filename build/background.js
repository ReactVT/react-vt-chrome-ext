// load content script
chrome.tabs.executeScript({file: "content-script/script.js"}, function() {
        console.log("content script loaded");
      });

var connections = {};
var virtualDOM;
var panelId; 
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

  // post message to content script
  setTimeout(()=>{
    console.log('sent out backgroundjs msg to webpage from port ', port)
    port.postMessage({type: "backgroundmsg", message:"greetings from backgroundjs"});
  }, 0);

    
  // listen for messages from content script and from panel
  port.onMessage.addListener(function(data) {
    console.log('background received message', data);
    if (data.type === 'virtualdom') {
      virtualDOM = data;
      panelId.postMessage(virtualDOM);
    }
    else if (data.name === 'panelToBackgroundInit') {
      panelId = connections[data.tabId]
      console.log('checking connection', connections);
      connections[data.tabId].postMessage(virtualDOM);
    }
    else if (data.type === 'assertion') {
      port = chrome.runtime.connect({name: "contentscript-port"});
      console.log('in assertion condtiional', port)
      port.postMessage(data);
    }
  });
});