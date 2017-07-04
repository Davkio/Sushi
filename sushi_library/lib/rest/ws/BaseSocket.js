"use strict";

const WebSocket = require("ws");

class BaseSocket extends WebSocket {
    /**
     * Base level socket connection event handling
     * @extends Websocket
     * @param {String} url Url used to connect to Discord's websocket 
     */
    constructor(url) {
        super(url);
    }

    /**
     * Send the packet to discord's server
     * @param {String} op OP code for the packet
     * @param {String} data Payload
     */
    send(op, data) {
        let m = { op: op, d: data };
        console.log(`[GATEWAY/Sent] OP: ${op}`);

        super.send(JSON.stringify(m));
    }
}

module.exports = BaseSocket;