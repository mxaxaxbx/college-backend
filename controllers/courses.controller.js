const coursesModel      = require('../models/courses.model');
const groupCoursesModel = require('../models/group-courses.model');

const create = async (req, res) => {
    try {
        if( !req.body.name || !req.body.group_id ) return res.status(400).send({
            code: 101,
            message: 'Incomplete data',
        });

        const existingRole = await coursesModel.findOne({ name: req.body.name });

        if( existingRole ) return res.status(400).send({
            code: 102,
            message: 'Course already exists',
        });

        const group = await groupCoursesModel.findById( req.body.group_id );

        if( !group ) return res.status(400).send({
            code: 102,
            message: 'The group does not exists',
        });

        const course = new coursesModel({
            name: req.body.name,
            group_id: group._id,
            max_students_q: req.body.max_students_q ? parseInt( req.body.max_students_q ) : 0,
        });

        const result = await course.save();

        if( !result ) return res.status(400).send({
            code: 104,
            message: 'An error ocurred trying saving course',
        });

        return res.status(201).send({ data: course });

    } catch(e) {
        console.log(`courses controller create error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred please try again later',
        });
    }

}

module.exports = { create };
