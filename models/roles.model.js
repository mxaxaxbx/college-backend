const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    name        : { type : String, required : true },
    status      : { type : String, required : true },
    date        : { type : Date, default : Date.now() },
});

const roles = mongoose.model("roles", rolesSchema);

module.exports = roles;
