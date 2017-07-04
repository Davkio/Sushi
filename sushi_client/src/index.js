"use strict";

const Sushi = require("../../sushi_library/lib/index");

class SushiBot extends Sushi {
    constructor(options = {}) {
        super(options);
        
        this.options = options;
        this.token = options.token;
        
        this.connect(this.options.token);
    }
}

module.exports = SushiBot;