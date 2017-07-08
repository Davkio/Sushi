"use strict";

const Sushi = require("../../sushi_library/lib/index");

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

module.exports = SushiBot;