const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileInfoSchema = new Schema({
    Username: {
        type: String,
        required: true
    },
    FullName: {
        type: String,
        required: true
    },
    Address1: {
        type: String,
        required: true
    },
    Address2: {
        type: String
    },
    City:{
        type: String,
        required: true
    },

    State:{
        type: String,
        required: true
    },

    Zipcode:{
        type: String,
        required: true
    },

}, {timestamps: true})

const ProfileManagement = mongoose.model('user info', ProfileInfoSchema);
module.exports = ProfileManagement;