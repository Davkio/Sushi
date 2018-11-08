"use strict";

const Constants = require('./Constants');

const Request = require('./rest/Request');
const Endpoints = require('./rest/Endpoints');
const GatewaySocket = require('./rest/ws/GatewaySocket');

const SushiError = require('./core/SushiError');
const SushiLogger = require('./core/SushiLogger');
const SushiEvents = require('./core/SushiEvent');

const IUser = require('./interfaces/IUser');

class Sushi {
    /**
     * Create a Sushi client
     * @arg {Object} [options] Sushi options ( all options are optional )
     * @arg {String} [options.token] Bot token
     */
    constructor(options = {}) {

        this.options = options;
        this.token = options.token;

        this.gatewayURL = null;
        this.gatewaySocket = null;

        const gw = () => this.gatewaySocket;

        this.requestHandler = new Request(this);
        this.logger = new SushiLogger(this);
        this.SushiEvent = new SushiEvents();

        this.Bot = new IUser(this);
    }

    /**
     * Attempt to connect shards to the GatewaySocket
     * @returns {Promise} Resolves to a promise when successfully connected
     */
    connect() {
        return this.getGateway().then((data) => {
            this.options.shardCount = data.shards;
            this.gatewayURL = data.url;

            this.createPrimaryGateway();
        });
    }

    /**
     * Disconnects from the gateway socket
     */
    disconnect() {
        if (this.gatewaySocket) {
            this.gatewaySocket.disconnect();
            this.gatewaySocket = null;
        }
    }
    /**
     * Contact the gateway 
     * @returns {Promise<String>} Resolves with the Gateway URL
     */
    getGateway() {
        return this.requestHandler.request("GET", Endpoints.GATEWAY_BOT);
    }

    /**
     * Creates the primary gateway connection
     * @returns {Promise} returns Gateway socket connection
     */
    createPrimaryGateway() {
        if (!this.gatewaySocket) {
            const shardCount = this.options.shardCount

            const gatewayOptions = { shardCount };

            this.gatewaySocket = new GatewaySocket(this, gatewayOptions);
        }
        return this.gatewaySocket.connect(this.gatewayURL);
    }
}

module.exports = Sushi;