var port = chrome.runtime.connect({name: "contentscript-port"});

// Listening for events from webpage postmessages
window.addEventListener('message', function(event) {
  // only accept messges to self
  if (event.source != window) return;
  // specify message type to target specific message
  // filter out other messages floating around in existing context
  if (event.data.type === 'sample') {
    port.postMessage(event.data);
    console.log("content script received this from webpage: ", event.data);
  }
}, false);


// listening for events from backgroundjs
port.onMessage.addListener(function(message,sender){
  console.log('content script received this from backgroundjs: ', message, sender);
  // send message from background js to webpage
  window.postMessage(message, "*");
});
