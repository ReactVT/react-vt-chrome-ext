// load content script
chrome.tabs.executeScript({file: "content-script/script.js"}, function() {
        console.log("content script loaded");
      });

var connections = {};
var virtualDOM;
// handles incoming connections
chrome.runtime.onConnect.addListener(function(port) {
  //<-- connection to devtools d3tree
  var extensionListener = function (message, sender, sendResponse) {
    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
      console.log('in extension listener', message);
    if (message.name == "init") {
      console.log('in init conditional', message.tabId);
      connections[message.tabId] = port;
      console.log(connections)
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
  port.postMessage({type: "backgroundmsg", message:"greetings from backgroundjs"});
  // listen for messages from content script
  port.onMessage.addListener(function(data) {
    console.log('background received message from content script', data);
    if (data.type === 'virtualdom') virtualDOM = data;
    else if (data.name === 'init') connections[data.tabId].postMessage(virtualDOM);
  });
});

// //
// // Receive message from content script and relay to the devTools page for the
// // current tab
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   console.log('in chrome runtime onmessage');
//     // Messages from content scripts should have sender.tab set
//     if (sender.tab) {
//       var tabId = sender.tab.id;
//       if (tabId in connections) {
//         connections[tabId].postMessage(request);
//       } else {
//         console.log("Tab not found in connection list.");
//       }
//     } else {
//       console.log("sender.tab not defined.");
//     }
//     return true;
// });