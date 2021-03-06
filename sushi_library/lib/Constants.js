"use strict";

module.exports.Sushi = {
    SHARD_ID: 0,
    SHARD_COUNT: 0,
    ENCODING: "?v=6&encoding=JSON",
    BROWSER: "sushi",
    VERSION: 1
};

module.exports.WSEvents = {
    GATEWAY_READY: 0,

    CHANNEL_CREATE: 'CHANNEL_CREATE',
    CHANNEL_UPDATE: 'CHANNEL_UPDATE',
    CHANNEL_DELETE: 'CHANNEL_DELETE',
    CHANNEL_PINS_UPDATE: 'CHANNEL_PINS_UPDATE',

    GUILD_CREATE: 'GUILD_CREATE',
    GUILD_UPDATE: 'GUILD_UPDATE',
    GUILD_DELETE: 'GUILD_DELETE',

    GUILD_MEMBER_UPDATE: 'GUILD_MEMBER_UPDATE',
    GUILD_EMOJIS_UPDATE: 'GUILD_EMOJIS_UPDATE',
    GUILD_ROLE_CREATE: 'GUILD_ROLE_CREATE',
    GUILD_ROLE_UPDATE: 'GUILD_ROLE_UPDATE',
    GUILD_ROLE_DELETE: 'GUILD_ROLE_DELETE',

    TYPING_START: 'TYPING_START',
    MESSAGE_CREATE: 'MESSAGE_CREATE',
    MESSAGE_UPDATE: 'MESSAGE_UPDATE',
    MESSAGE_DELETE: 'MESSAGE_DELETE',
    MESSAGE_DELETE_BULK: 'MESSAGE_DELETE_BULK',
    MESSAGE_REACTION_ADD: 'MESSAGE_REACTION_ADD',
    MESSAGE_REACTION_REMOVE: 'MESSAGE_REACTION_REMOVE',
    MESSAGE_REACTION_REMOVE_ALL: 'MESSAGE_REACTION_REMOVE_ALL',

    VOICE_STATE_UPDATE: 'VOICE_STATE_UPDATE',
    VOICE_SERVER_UPDATE: 'VOICE_SERVER_UPDATE',

    USER_UPDATE: 'USER_UPDATE',
    PRESENCE_UPDATE: 'PRESENCE_UPDATE',
    GAME_OBJECT: 'GAME_OBJECT'
}

module.exports.GatewayOPCodes = {
    EVENT: 0,
    HEARTBEAT: 1,
    IDENTIFY: 2,
    STATUS_UPDATE: 3,
    VOICE_STATE_UPDATE: 4,
    VOICE_SERVER_PING: 5,
    RESUME: 6,
    RECONNECT: 7,
    GET_GUILD_MEMBERS: 8,
    INVALID_SESSION: 9,
    HELLO: 10,
    HEARTBEAT_ACK: 11,
    SYNC_GUILD: 12,
    SYNC_CALL: 13
};

module.exports.VoiceOPCodes = {
    IDENTIFY: 0,
    SELECT_PROTOCOL: 1,
    HELLO: 2,
    HEARTBEAT: 3,
    SESSION_DESCRIPTION: 4,
    SPEAKING: 5
};

module.exports.StatusTypes = {
    ONLINE: "online",
    OFFLINE: "offline",
    IDLE: "idle",
    DND: "dnd",
    INVISIBLE: "invisble"
}

module.exports.Permissions = {
    createInstantInvite: 1,
    kickMembers: 1 << 1,
    banMembers: 1 << 2,
    administrator: 1 << 3,
    manageChannels: 1 << 4,
    manageGuild: 1 << 5,
    addReactions: 1 << 6,
    viewAuditLogs: 1 << 7,
    readMessages: 1 << 10,
    sendMessages: 1 << 11,
    sendTTSMessages: 1 << 12,
    manageMessages: 1 << 13,
    embedLinks: 1 << 14,
    attachFiles: 1 << 15,
    readMessageHistory: 1 << 16,
    mentionEveryone: 1 << 17,
    externalEmojis: 1 << 18,
    voiceConnect: 1 << 20,
    voiceSpeak: 1 << 21,
    voiceMuteMembers: 1 << 22,
    voiceDeafenMembers: 1 << 23,
    voiceMoveMembers: 1 << 24,
    voiceUseVAD: 1 << 25,
    changeNickname: 1 << 26,
    manageNicknames: 1 << 27,
    manageRoles: 1 << 28,
    manageWebhooks: 1 << 29,
    manageEmojis: 1 << 30,
    all: 0b1111111111101111111110011111111,
    allGuild: 0b1111100000000000000000010111111,
    allText: 0b0110000000001111111110001010001,
    allVoice: 0b0110011111100000000000000010001
};

module.exports.OPErrors = {
    4000: "Unkown Error",
    4001: "Unkown OPCODE",
    4002: "Decode Error",
    4003: "Not Authenticated",
    4004: "Authentication Failed",
    4005: "Already Authenticated",
    4007: "Invalid Seq",
    4008: "Rate Limited",
    4009: "Session Timeout",
    4010: "Invalid Shard",
    4011: "Sharding Required"
};