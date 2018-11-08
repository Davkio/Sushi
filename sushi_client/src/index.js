"use strict";

const Sushi = require("../../sushi_library/lib/index");
const config = require('./config.json');

class SushiBot {
    constructor(options = {}) {
        var client = new Sushi(options);
        client.connect();

        client.SushiEvent.on("READY", (e) => {
            console.log("Logged in!");
        });

        client.SushiEvent.on("MESSAGE_CREATE", (e) => {
            // only works for me right now
            if (e.author.id == options.owner_id) {

                // set the online presence
                if (e.content.startsWith("sushi --setstatus")) {
                    var args = e.content.split(" ");
                    client.Bot.setStatus(args[2]);
                }
                if (e.content.startsWith("sushi --roles")) {
                    client.Bot.getRoles(e).then((data) => {
                        let role = data.find(data => data.name == 'Game night').id;
                    });
                }
                if (e.content.startsWith("sushi --gameNight")) {
                    let role = null;
                    client.Bot.getRoles(e).then((data) => {
                        role = data.find(data => data.name == 'Game night').id;
                        //console.log(role);
                    });

                    client.Bot.sendMessage(e, "React to be involved with the next game night!\nRemove reaction to be removed").then((data) => {

                        client.SushiEvent.on("MESSAGE_REACTION_ADD", (reac) => {
                            if (reac.message_id == data.id && reac.channel_id == data.channel_id) {
                                console.log(reac.guild_id + " " + reac.user_id + " " + role);
                                client.Bot.userAddRole(reac.guild_id, reac.user_id, role).then(null, (err) => {
                                    console.log("Error adding role");
                                });
                            }
                        });
                        client.SushiEvent.on("MESSAGE_REACTION_REMOVE", (reac) => {
                            if (reac.message_id == data.id && reac.channel_id == data.channel_id) {
                                console.log(reac.guild_id + " " + reac.user_id + " " + role);
                                client.Bot.userRemoveRole(reac.guild_id, reac.user_id, role).then(null, (err) => {
                                    console.log("Error removing role");
                                });
                            }
                        });
                    });
                }
            }
        });


    }

    /**
     * Take the event object, and return the message as an array
     * @param {object} message 
     */
    getArguments(message) {

    }
}
var client = new SushiBot(config);

/*
class SushiBot extends Sushi {
    constructor(options = {}) {
        super(options);
        
        this.options = options;
        this.token = options.token;
        
        this.connect(this.options.token);
    
        this.SushiEvent.on("READY", (e) => {
            console.log("CLIENT -- READY");
        });

        this.SushiEvent.on("MESSAGE_CREATE", (e) => {
            if (e.content.startsWith('sushi --debug ')) {

                if (e.content.endsWith('message')) {
                    return console.log(e)
                }
                if (e.content.endsWith('channel')) {
                    let channel = e.channel_id;
                    return this.requestHandler.request("GET", `/channels/${channel}`).then((data) => {
                        console.log(data);
                    })
                }
                if (e.content.endsWith('--send')) {
                    let channel = e.channel_id;
                    return this.requestHandler.request("POST", `/channels/${channel}/messages`, { content: JSON.stringify(e) });
                }
                if (e.content.endsWith("--status")) {
                    return this.Bot.setStatus("dnd", "In development!");
                }
            }
        })
    }

}
*/

module.exports = SushiBot;