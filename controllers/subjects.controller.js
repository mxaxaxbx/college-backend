const subjectsModel = require('../models/subjects.model');

const create = async (req, res) => {
    if( !req.body.name ) return res.status(400).send({
        code: 101,
        message: 'Incomplete data',
    });

    const subjectExists = await subjectsModel.findOne( { name: req.body.name } );

    if( subjectExists ) return res.status(400).send({
        code: 102,
        message: 'Subject name already exists',
    });

    const subject = new subjectsModel({
        name: req.body.name,
        description: req.body.description,
        status: true,
    });

    const result = await subject.save();

    if( !result ) return res.status(400).send({
        code: 103,
        message: 'An error ocurred saving subject',
    });

    return res.status(201).send({ data : subject });
}

const getAll = async (req, res) => {
    const subjects = await subjectsModel.find().exec();
    return res.status(200).send({ data: subjects });
}

module.exports = { create, getAll };
