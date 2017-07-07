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
            if (e.content == 'sushi --debug --message') {
                return console.log(e)
            }
            if (e.content == 'sushi --debug --channel') {
                return console.log(e.channel_id);
            }
        })
    }

}

module.exports = SushiBot;