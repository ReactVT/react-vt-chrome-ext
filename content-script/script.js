// var passedData = [];
var port = chrome.runtime.connect({name: "contentscript-port"});

// Listening for events from webpage postmessages
window.addEventListener('message', function(event) {
  // only accept messges to self
  if (event.source != window) return;
  port.postMessage(event.data);
  console.log("content script received this from webpage: ", event.data);
}, false);

// listening for events from backgroundjs
port.onMessage.addListener(function(message,sender){
  console.log('listening for things from backgroundjs: ', message, sender);
});

