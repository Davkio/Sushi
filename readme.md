# **Sushi**

Sushi is a very early stage, WIP Node.js library which provides an interface for Discord's API for creating bots.

## **Requirements**

Node.js >4.0.0


**Currently only bots are supported, not self-bots**

## **Example**

Sample code for a client is listed under the `./sushi_client` directory. 
Sushi library can also be called simply like this

```Javascript

var Sushi = require("sushi");

var bot = new Sushi();
bot.connect("YOUR_TOKEN_HERE);
```

## **TODO**

**VOICE CURRENTLY OUT OF SCOPE** -- Possible future implementation. Groundwork will be laid but currently having a Sushi client speak over voice will not be covered

**Everything**, basically. All that is currently implemented is contacting the gateway and initializing the WebSocket connection. 

Priority for implementations is roughly as follows


### 1. WebSocket

  * WebSocket heartbeat

### 2. Gateway

  * Handle Disconnection / Resuming events

### 3. Events

  * Custom event emitters for all gateway events
  * Expansion on `SushiError` for centralized error logging

### 4. "Everything" Else

Once Websocket and Gateway has been handled, and handling of gateway events begins work, collections and interfaces can start being developed to handle and interpret messages from users and their events.