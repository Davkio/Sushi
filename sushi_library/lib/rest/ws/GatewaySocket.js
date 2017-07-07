"use strict";

const BaseSocket = require('./BaseSocket');
const Constants = require('../../Constants');

class GatewaySocket {
    /**
     * 
     * @param {Object} sushi The sushi client
     * @param {Object} options Options for connecting to the Gateway -- TODO: set this up
     */
    constructor(sushi, options) {
        this.sushi = sushi;
        this.socket = null;

        this.logger = this.sushi.logger;
        this.token = this.sushi.token;
        
        this.seq = 0;        
        this.heartbeatAck = false;
        this.heartbeatInterval = 0;
    }

    /**
     * Attempt to connect to Discords server
     * @param {*} url Gateway connection url.
     */    
    connect(url) {

        this.gatewayURL = url || this.gatewayURL;

        // BaseSocket class which extends WebSocket         
        let ws = this.socket = new BaseSocket(this.gatewayURL + Constants.Sushi.ENCODING, this.logger);
        
        ws.on("open", e => {
            this.logger.log("[GW/Open]");
            this.identify();
        });

        ws.on("message", e => {

            const msg = JSON.parse(e);
            const op = msg.op;      // op code
            const d = msg.d;        // event data 
            const s = msg.s;        // sequence number || only for OP 0
            const t = msg.t;        // event name for payload || only for OP 0

            //this.logger.log(`[GATEWAY/Received] OP: ${op} | T: ${t} | D: ${d}`);

            this.logger.log(`[GW/Received] op: ${op} t: ${t}`);

            if (op === Constants.GatewayOPCodes.HELLO) {
                this.heartbeatInterval = d.heartbeat_interval;
                this.heartbeat();
            }

            if (op === Constants.GatewayOPCodes.HEARTBEAT_ACK) {
                this.logger.log(`[GW/HB_Ack]`);
                this.heartbeatAck = true;
            }
            
            if (t === "READY") {
                this.logger.log("[GW/Ready]");
            }

            ws.on("close", (e) => {
                this.logger.error('[WS/Close]', e);
            })
        });

    }

    /**
     * Identify the client to discord server
     */    
    identify() {
        const data = {
            token: this.token,
            properties: {
                "$os": "",
                "$browser": Constants.Sushi.BROWSER,
                "$device": ""
            },
            v: Constants.Sushi.VERSION,
            compress: false
        };
        this.send(Constants.GatewayOPCodes.IDENTIFY, data);
    }

    /**
     * Send a heartbeat to discord's servers
     */    
    heartbeat() {
        this.send(Constants.GatewayOPCodes.HEARTBEAT, this.seq);
    }

    /**
     * Send the packet to Discord
     * @param {String} op OP code for the packet
     * @param {String} data Information to be sent
     */
    send(op, data) {
        this.socket.send(op, data);
    }
}

module.exports = GatewaySocket;