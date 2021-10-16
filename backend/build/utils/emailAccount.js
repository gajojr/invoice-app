"use strict";
require('dotenv').config({ path: '../.env' });
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
var sendLeavingEmail = function (email, username) {
    var msg = {
        to: email,
        from: 'andreccccc12@gmail.com',
        subject: 'Invoice app',
        text: "We are sorry you are leaving us " + username + ", your account is now deleted."
    };
    sgMail
        .send(msg)
        .then(function () { }, function (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    });
};
module.exports = {
    sendLeavingEmail: sendLeavingEmail
};
