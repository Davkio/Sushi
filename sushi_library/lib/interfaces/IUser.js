"use strict";
const Constants = require('../Constants');
const Endpoints = require('../rest/Endpoints');
class IUser {
    constructor(sushi) {

        this.sushi = sushi;
    }

    /**
     * Set the game and visibility status for client
     * @param {String} status Sushi client online visibility. "online" "dnd" "idle" "invisible" "offline"
     * @param {String} game The game client will be playing
     */
    setStatus(status, game) {
        if (arguments.length == 0) return;

        status = status || Constants.StatusTypes.ONLINE;
        game = game || null;
        this.sushi.gatewaySocket.statusUpdate(status, game);
    }

    /**
     * Get the information on a message that was just sent
     * @param {Object} e Message creation event 
     */
    getMessage(e) {
        return this.sushi.requestHandler.request("POST", `/channels/${e.channel_id}/messages/${e.message_id}`)
    }

    /**
     * Get all the roles on the server
     * @param {Object} e Event object 
     */
    getRoles(e) {
        return this.sushi.requestHandler.request("GET", Endpoints.PERMS.Endpoints.GUILD_ROLES(e.guild_id));
    }

    /**
     * Adds a reaction from the bot to a message
     * @param {String} channelId ID of the channel  
     * @param {String} messageId ID of the message
     * @param {String} emoji The actual emoji itself, not a code
     */
    addReaction(channelId, messageId, emoji) {
        emoji = encodeURIComponent(emoji);
        console.log(emoji);
        return this.sushi.requestHandler.request("PUT", Endpoints.PERMS.Endpoints.ADD_REACTION(channelId, messageId, emoji));
    }
    updateRole(e, roleId, change) {

    }
    /**
     * Send a message from the bot
     * @param {Object} e Event object
     * @param {String} message The message to be sent 
     */
    sendMessage(e, message) {
        let channel = e.channel_id;
        return this.sushi.requestHandler.request("POST", `/channels/${channel}/messages`, { content: message });
    }

    sendEmbed(e, embedObject) {
        let channel = e.channel_id;

        return this.sushi.requestHandler.request("POST", `/channels/${channel}/messages`, { embed: embedObject });
    }
    /**
     * Set the 'Now Playing' text for a Sushi Client
     * @param {String} game Game to set set as playing
     */
    setGame(game) {
        if (arguments.length == 0) return;
        this.setStatus(null, game);
    }
    /**
     * 
     * @param {String} guildId ID of the guild
     * @param {String} userId ID of the user
     * @param {String} roleId ID of the rolr
     */
    userAddRole(guildId, userId, roleId) {
        return this.sushi.requestHandler.request("PUT", Endpoints.PERMS.Endpoints.MEMBER_ROLE(guildId, userId, roleId));
    }
    /**
     * 
     * @param {String} guildId ID of the guild
     * @param {String} userId ID of the user
     * @param {String} roleId ID of the rolr
     */
    userRemoveRole(guildId, userId, roleId) {
        return this.sushi.requestHandler.request("DELETE", Endpoints.PERMS.Endpoints.MEMBER_ROLE(guildId, userId, roleId));
    }
}

module.exports = IUser;