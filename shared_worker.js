importScripts("pusher.worker.js");

// An array of the clients/tabs using this worker
var clients = [];

// Connect to Pusher
var pusher = new Pusher('1fb94680701ab31a3139', {
  encrypted: true
});

// Subscribe to test_channel
var channel = pusher.subscribe('test_channel');

// Bind to my event
channel.bind('my_event', function(data) {

  // For each client, relay the message on to them
  for (var i = 0; i < clients.length; i++) {
    var port = clients[i];
    port.postMessage(data);
  }  
});

self.addEventListener("connect", function(evt){

  // Add the port to the list of connected clients
  var port = evt.ports[0];
  clients.push(port);

  port.addEventListener('message', function(evt) {
    var message = evt.data;
    if (message === "disconnect") {
      // Whenever we get the `disconnect` event from the client, disconnect from Pusher
      // and shut down the worker
      pusher.disconnect();
      self.port.close();
    }
  });

  // Start the worker.
  port.start();
});