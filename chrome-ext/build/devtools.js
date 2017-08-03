chrome.devtools.panels.create('react-vt', 'icon.png',
  'panel/index.html', () => console.log('creating panel'));

// // DevTools page -- devtools.js
// // Create a connection to the background page
// var port = chrome.runtime.connect({
//     name: 'd3-panel'
// });


//   port.onMessage.addListener(function (message) {
//     console.log('devtools got message from background page', message);
//     if (!hasBeenShown()) {
//       buffer.push(message);
//     } else {
//       drawMessage(message);
//     }
//   });

