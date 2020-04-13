'use strict';

const Mailgun = require('mailgun-js');
const { mailAPIKey , mailDomain, mailSender } = require('./settings.json');
const mailgun = new Mailgun({ apiKey: mailAPIKey, domain: mailDomain });

/**
 * Sends email with information specified by data
 * 
 * @param {Promise} data
 */
exports.send = function send (data) {
    data.from = data.from || mailSender;
    return mailgun.messages().send(data);
}
