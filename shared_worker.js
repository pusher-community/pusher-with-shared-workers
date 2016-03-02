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

  // Relay the message on to each client
  clients.forEach(function(client){
    client.postMessage(data);
  });
});

self.addEventListener("connect", function(evt){

  // Add the port to the list of connected clients
  var port = evt.ports[0];
  clients.push(port);

  // Start the worker.
  port.start();
});