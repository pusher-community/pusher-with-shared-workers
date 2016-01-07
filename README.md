# Using Pusher With Shared Workers

Our community library [pusher-websocket-js-iso](https://github.com/pusher-community/pusher-websocket-js-iso) has introduced support for using PusherJS in [Shared Workers](https://developer.mozilla.org/en/docs/Web/API/SharedWorker).

While browser compatibility may be an issue, this adds the possibility of cutting down on your number of connections by sharing one across multiple tabs.

In this repo is a quick example that lets the user 'connect' and 'disconnect' to the worker, which listens to Pusher messages and relays them to the main thread. The main thread then shows it on the web page.

## Setting Up Pusher

Go to our [pusher-websocket-js-iso](https://github.com/pusher-community/pusher-websocket-js-iso) library, and download `dist/worker/pusher.js`, our build specifically for browser workers.

To load in the library, simply call in your worker script:

```js
importScripts("path/to/pusher.js");
```

## To Run This App

Open up your debug console at <http://dashboard.pusher.com> to check everything is in order.

Then to run the app:

    $ git clone https://github.com/pusher-community/pusher-with-shared-workers.git
    $ cd pusher-with-shared-workers
    $ python -m SimpleHTTPServer

Then navigate to http://localhost:8000.

Press `Connect` to connect to the Shared Worker, which will connect to Pusher. In your debug console you should see that you have opened a connection.

Open a new tab and press `Connect` again, and you should see in your debug console that no new connection has been initialized, as both web pages are sharing a connection.

In the event creator in the debug console page, send an event called `my_event` on a channel called `test_channel` which whatever data you want. You should see that the message is appearing on both tabs, while using the same connection. 