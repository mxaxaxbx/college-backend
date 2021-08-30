const mongoose = require('mongoose');

const groupCoursesSchema = new mongoose.Schema({
    name        : { type : String, required : true },
    status      : { type : String, required : true },
    date        : { type : Date, default : Date.now() },
});

const groupCourses = mongoose.model("group_courses",  groupCoursesSchema);

module.exports = groupCourses;
