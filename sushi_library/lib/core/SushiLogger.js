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
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();

        if (h < 10) {
            h = '0' + h;
        }

        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }

        return `${h}:${m}:${s}`
    }
}

module.exports = SushiLogging;