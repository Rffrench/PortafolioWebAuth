// Controlador Microservicio Autenticación
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // Encryption
const jwt = require('jsonwebtoken'); // JWT Tokens


// Registro de Usuario
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    const roleId = 1;

    // TODO: Falta validar que no exista el usuario
    User.create({
        email: email,
        username: username,
        password: password,
        name: name,
        lastName: lastName,
        roleId: roleId
    })
        .then(result => {
            console.log(result);
            res.status(200).json({ result: 'Ingresado' });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}


// Login Usuario
exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // TODO: Falta validar 
    User.findOne({
        where: { username: username }
    })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email could not be found.');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({ password: user.password });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

}