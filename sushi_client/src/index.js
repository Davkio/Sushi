"use strict";

const Sushi = require("../../sushi_library/lib/index");
const config = require('./config.json');
const credentials = require('./credentials.json')
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';


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

                if (e.content.startsWith("sushi --schedule")) {

                    fs.readFile('credentials.json', (err, content) => {
                        if (err) return console.log('Error loading client secret file:', err);
                        // Authorize a client with credentials, then call the Google Sheets API.
                        authorize(JSON.parse(content), printSchedule).then((data) => {
                            console.log(data);
                            var availability = "";
                            for (var i = 0; i < 9; i++) {
                                availability = availability + data[i][0] + " " + data[i][1] + "\n"
                            }
                            //console.log(availability)
                            client.Bot.sendMessage(e, availability);
                        });

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



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    return new Promise((resolve, reject) => {
        const { client_secret, client_id, redirect_uris } = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            oAuth2Client.setCredentials(JSON.parse(token));
            resolve(callback(oAuth2Client));

        });
    })


}


/**
 * Prints the schedules in the dim sim spread
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function printSchedule(auth) {
    return new Promise((resolve, reject) => {
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: '1sVeoxJ8R1PYovddGN6D-qJxF8CVTzvue3SuwQ3_vrno',
            range: 'Schedule!L10:M18',
        }, (err, res) => {
            if (err) reject(console.log('The API returned an error: ' + err));
            const rows = res.data.values;
            if (rows.length) {
                // Prints the 2 columns
                rows.map((row) => {
                    console.log(`${row[0]}, ${row[1]}`);
                });
                resolve(rows);
            } else {
                console.log('No data found.');
            }
        });
    })

}
module.exports = SushiBot;