"use strict";

class SushiError extends Error {
    
    /**
     * Centralized Error handling for sushi
     * @param {String} message Specific message
     * @param {Object} exception The error which occured
     */
    constructor(message, exception) {
        super(message);
        if(exception) this.exception = exception
    }

    /**
     * Convert message to JSON
     * @returns {Object}
     */    
    toJSON() {
        return this.message;
    }

}

module.exports = SushiError;