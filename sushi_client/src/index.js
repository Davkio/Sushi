"use strict";

const Sushi = require("../../sushi_library/lib/index");

class SushiBot extends Sushi {
    constructor(options = {}) {
        super(options);
        
        this.options = options;
        this.token = options.token;
        
        this.connect(this.options.token);
    
        this.SushiEvent.on("GATEWAY_READY", (e) => {
            //console.log("Client -- GW ready", e);
        }) 
    }

}

module.exports = SushiBot;