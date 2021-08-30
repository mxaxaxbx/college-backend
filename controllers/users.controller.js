const usersModel    = require('../models/users.model');
const rolesModel    = require('../models/roles.model');
const subjectsModel = require('../models/subjects.model');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try{
        if( !req.body.name || !req.body.email || !req.body.password ) return res.status(400).send({
            code: 101,
            message: 'Incomplete data',
        });

        const existingUser = await usersModel.findOne({ email: req.body.email });

        if( existingUser ) return res.status(400).send({
            code: 102,
            message: 'User already existing',
        });

        const hash = await bcrypt.hash( req.body.password, 10);

        let role_id = "612901656d08e949bc0b8eee";

        if( req.body.role_id ) {
            const role = await rolesModel.findById( req.body.role_id );

            if ( !role ) return res.status(400).send({
                code: 102,
                message: 'Enter a valid role',
            });

            if ( role.name === "admin" ) return res.status(400).send({
                code: 102,
                message: 'Enter a valid role',
            });

            role_id = role._id
        }

        let subjects = [];

        if( req.body.subjects ) {
            const iterable = isIterable( req.body.subjects );
            
            if( !iterable ) return res.status(400).send({
                code: 102,
                message: 'Subjects is not a iterable item',
            });

            const validSubs = await validSubjects( req.body.subjects );

            if( !validSubs ) return res.status(400).send({
                code: 102,
                message: 'Enter a valid subjects',
            });
            else subjects = validSubs;
        }

        const user = new usersModel({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role_id,
            subjects,
            status: true,
        });

        const result = await user.save();

        if( !result ) return res.status(400).send({
            code: 102,
            message: 'An error ocurred trying save user',
        });

        return res.status(201).send({ data: user._id });

    } catch(e) {
        console.log(`Users controller register error: ${e}`);
        return res.status(400).send({
            code: 105,
            message: 'An error ocurred',
        });
    }
}

const isIterable = ( data ) => {
    if( data == null) return false;

    return typeof data[Symbol.iterator] === 'function';
}

const validSubjects = async (subs=[]) => {
    try{
        let subjects = [];

        for(const sub of subs) {
            const existingSub = await subjectsModel.findById( sub );

            if( !existingSub ) return null;

            subjects.push(existingSub._id);
        };
        
        return subjects;

    } catch(e) {
        console.log(`Users controller valid subject error: ${e}`);
        return null;
    }
}

module.exports = { register };
