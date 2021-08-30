const groupCoursesModel = require('../models/group-courses.model');

const create = async (req, res) => {
    if( !req.body.name ) return res.status(400).send({
        code: 101,
        message: 'Incomplete data',
    });

    const existingGroup = await groupCoursesModel.findOne( { name: req.body.name } );

    if( existingGroup ) return res.status(400).send({
        code: 102,
        message: 'Group already exists',
    });

    const groupCourse = new groupCoursesModel({
        name: req.body.name,
        status: true,
    });

    const result = await groupCourse.save();

    if( !result ) return res.status(400).send({
        code: 103,
        message: 'An error ocurred saving course',
    });

    return res.status(201).send({ data: groupCourse });
}

const getAll = async (req, res) => {
    const groups = await groupCoursesModel.find();
    return res.status(200).send({ data: groups });
}

module.exports = { create, getAll };
