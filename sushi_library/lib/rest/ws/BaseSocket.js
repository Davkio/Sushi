"use strict";

const WebSocket = require("ws");

const heartbeat = new WeakMap();

class BaseSocket extends WebSocket {
    /**
     * Base level socket connection event handling
     * @extends Websocket
     * @param {String} url Url used to connect to Discord's websocket 
     */
    constructor(url, logger) {
        super(url);
        this.logger = logger;
    }

    /**
     * Send the packet to discord's server
     * @param {String} op OP code for the packet
     * @param {String} data Payload
     */
    send(op, data) {
        let m = { op: op, d: data };
        this.logger.log(`[GW/Sent] op: ${op}`);

        try {
            super.send(JSON.stringify(m));
        } catch (e) {
            this.logger.error(`[GW/Fail] ${e.stack}`);
        }
    }

    unsetHeartbeat() {
        var handle = heartbeat.get(this);
        if (handle !== undefined) clearInterval(handle);
        heartbeat.delete(this);
    }   
    
    setHeartbeat(callback, msec) {

        this.unsetHeartbeat();
        
        heartbeat.set(this, setInterval(() => {
            callback();
        }, msec));
    }

    close() {
        super.close()
        clearTimeout(5);
    }
}

module.exports = BaseSocket;