var port = chrome.runtime.connect({name: "contentscript-port"});

// Listening for events from webpage postmessages
window.addEventListener('message', function(event) {
  // only accept messges to self
  if (event.source != window) return;
  // specify message type to target specific message
  // filter out other messages floating around in existing context
  if (event.data.type === 'virtualdom' || event.data.type === 'test-result') {
    // send received data to backgroundjs
    port.postMessage(event.data);
  }
}, false);

// listening for messages from backgroundjs
port.onMessage.addListener(function(message,sender){
  // send message from background js to webpage
  window.postMessage(message, "*");
});