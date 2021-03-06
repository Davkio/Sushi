"use strict";
"use strict";

const SushiError = require('./SushiError');
const Constants = require("../Constants");

const events = require("events");

let lastEvent = null;

function validateEvent(eventType) {
    if (!eventType in Constants.Events) {
        throw new SushiError(`Invalid event ${eventType}`);
    }
}

class SushiEvents extends events.EventEmitter {
    constructor() {
        super();
        this.anyeventlisteners = [];
        this.setMaxListeners(14);
    }

    /**
     * 
     * @param {*} fn Function
     * @param MESSAGE_CREATE 
     */
    onAny(fn) {
        if (typeof fn !== "function")
            return this;
        this.anyeventlisteners.push(fn);
        return this;
    }

    emit(eventType, data) {
        super.emit(eventType, data);
    }
}

module.exports = SushiEvents;