const mongoose = require("mongoose");
//const passportLocalMongoose = require("passport-local-mongoose");
//const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{type: String, required: true},
    password:{type: String, required: true},
},{timestamps: true});


const UserCreds = mongoose.model('user credentials', UserSchema);
module.exports = UserCreds; 