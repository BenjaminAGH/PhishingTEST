"use strict";
const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },    
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    html: {
        type: String,
        required: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
        require: true
    },
    isHacked: {
        type: Boolean,
        default: false,
    },
    userEntered: {
        type: String,
    },
    passEntered: {
        type: String,
    },
    caseId: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
    },
});

const Mail = mongoose.model("Mail", mailSchema);
module.exports = Mail;