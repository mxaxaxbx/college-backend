const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
    name        : { type : String, required : true },
    description : { type : String, required : false },
    status      : { type : String, required : true },
    date        : { type : Date, default : Date.now() },
});

const subjects = mongoose.model("subjects",  subjectsSchema);

module.exports = subjects;
