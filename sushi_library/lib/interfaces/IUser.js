"use strict";
const Constants = require('../Constants');

class IUser {
    constructor(sushi) {
        
        this.sushi = sushi;
    }

    /**
     * Set the game and visibility status for client
     * @param {String} status Sushi client online visibility
     * @param {String} game The game client will be playing
     */    
    setStatus(status, game) {
        if (arguments.length == 0) return;

        status = status || Constants.StatusTypes.ONLINE;
        game = game || null;
        this.sushi.gatewaySocket.statusUpdate(status, game);
    }    
    
    /**
     * Set the 'Now Playing' text for a Sushi Client
     * @param {String} game Game to set set as playing
     */
    setGame(game) {
        if (arguments.length == 0) return;
        this.setStatus(null, game);
    }
}

module.exports = IUser;