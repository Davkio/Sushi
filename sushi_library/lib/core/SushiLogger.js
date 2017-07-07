"use strict";

class SushiLogging {

    constructor(sushi) {
        this.sushi = sushi;
    }

    log(info, message) {
        message = message || " ";
        console.log(this.getTime() + ' [LOG/Info] ' + info + ' ' + message);
    }

    warn(info, message) {
        message = message || " ";
        console.log(this.getTime() + ' [LOG/Warn] ' + info + ' ' + message);
    }

    error(info, message) {
        message = message || " ";
        console.log(this.getTime() + ' [LOG/ERR]  ' + info + ' ' + message);
    }

    getTime() {
        let d = new Date();
        return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    }
}

module.exports = SushiLogging;