const mongoose = require('mongoose');
const jwt      = require('jsonwebtoken');
const moment   = require('moment');

const usersSchema = new mongoose.Schema({
    name     : { type : String, required : true },
    email    : { type : String, required : true },
    password : { type : String, required : true },
    role_id  : { type: mongoose.Schema.Types.ObjectId, ref : "roles" },
    subjects : [ { type: mongoose.Schema.Types.ObjectId, ref : "subjects" } ],
    status   : { type : Boolean, required : true },
    date     : { type : Date, default : Date.now() },
});

usersSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id     : this._id,
            name    : this.name,
            role_id : this.role_id,
            iat     : moment().unix(),
        },
        process.env.SECRET_KEY_JWT
    );
}

const users = mongoose.model("users",  usersSchema);

module.exports = users;
