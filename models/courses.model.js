const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    name           : { type : String, required : true },
    group_id       : { type: mongoose.Schema.Types.ObjectId, ref : "group_courses" },
    max_students_q : { type : Number, required : true },
    date           : { type : Date, default : Date.now() },
});

const courses = mongoose.model("courses",  coursesSchema);

module.exports = courses;
