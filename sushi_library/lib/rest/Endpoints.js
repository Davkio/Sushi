"use strict";

module.exports.BASE_URL = "/api/v6";

module.exports.CHANNELS = "/channels";
module.exports.GATEWAY = "/gateway";
module.exports.GATEWAY_BOT = "/gateway/bot";

module.exports.PERMS = {
    Endpoints: {
        GUILD_ROLES: (guildId) => `/guilds/${guildId}/roles`,
        MEMBER_ROLE: (guildId, userId, roleId) => `/guilds/${guildId}/members/${userId}/roles/${roleId}`,
        ADD_REACTION: (channelId, messageId, emoji) => `/channels/${channelId}/messages/${messageId}/reactions/${emoji}/@me`
    }
}
