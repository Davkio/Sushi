"use strict";

const Endpoints = require("./Endpoints");
const HTTPS = require("https");

class RequestHandler {
    /**
     * Create an class for handling API Requests to Discord's servers 
     * @param {Object} sushi Sushi client
     */
    constructor(sushi) {
        this._sushi = sushi;
        this.baseURL = Endpoints.BASE_URL
        this.userAgent = 'DiscordBot (https://sashimi.moe/, 1.0)';
    }

    /**
     * Make an API Request
     * @param {String} method HTTP method 
     * @param {String} url  URL of the endpoint
     * @param {Object} [body] Request
     * @returns {Promise<Object>} Resolves with the returned JSON data
     */
    request(method, url, body) {
        return new Promise((resolve, reject) => {

            var response;
            var headers = {
                "User-Agent": this.userAgent,
                "Authorization": 'Bot ' + body
            };

            var options = {
                headers: headers,
                method: method,
                hostname: "discordapp.com",
                path: this.baseURL + url
            }

            var req = HTTPS.request(options, (res) => {
                
                if (res.statusCode < 200 || res.statusCode >= 300) {
                    return reject(new Error('statusCode=' + res.statusCode));
                }
                // c
                var body = [];

                res.on('data', (data) => {
                    body.push(data);
                });

                // resolve on end
                res.on('end',  () => {
                    try {
                        body = JSON.parse(Buffer.concat(body).toString());
                    } catch (e) {
                        reject(e);
                    }
                    resolve(body);
                });
            });
            // reject on request error
            req.on('error', function (err) {
                reject(err);
            });
            req.end();
        });
    }
}

module.exports = RequestHandler;