const rolesModel = require('../models/roles.model');

const create = async(req, res) => {
    if( !req.body.name ) return res.status(400).send({
        code: 101,
        message: 'Incomplete data',
    });

    const existingRole = await rolesModel.findOne( { name: req.body.name } );
    
    if( existingRole ) return res.status(400).send({
        code: 103,
        message: 'Role already existing',
    });

    const role = new rolesModel({
        name: req.body.name,
        status: true,
    });

    const result = await role.save();

    if( !result ) return res.status(400).send({
        code: 103,
        message: 'An error ocurred trying save the role',
    });

    return res.status(201).send({ data: role });
}

module.exports = { create };
