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

    // Se transforma en hash la contraseña
    bcrypt
        .hash(password, 12) // 2do param es la longitud del SALT para añadirle mayor seguridad.
        .then(hashedPw => {
            console.log(hashedPw); // COntraseña hasheada
            return User.create({ // Método Sequelize que inserta un usuario en la BD. Devuelve Promesa por eso el return
                email: email,
                username: username,
                password: hashedPw,
                name: name,
                lastName: lastName,
                roleId: roleId
            });
        })
        .then(result => {
            res.status(201).json({ message: 'User created!', userId: result.id }); // Si se crea el usuario se manda JSON con mensaje e ID
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

}


// Login Usuario
exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    let loadedUser; // Usuario cargado de la BD


    // Sequelize. Se va a buscar un solo usuario a la BD que tenga el mismo username
    User.findOne({
        where:
            { username: username }
    })
        .then(user => {
            if (!user) { // En caso de no encontrar ninguno, se lanza excepción
                const error = new Error('No se han encontrado usuarios con el nombre de usuario ingresado');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            console.log(user);
            return bcrypt.compare(password, user.password); // Se comparan contraseña ingresada con hash almacenado
        })
        .then(isEqual => { // SI las contraseñas no son iguales, excepción
            if (!isEqual) {
                const error = new Error('Wrong password!');
                error.statusCode = 401;
                throw error;
            }
            // Sino, se crea TOKEN para el usuario
            const token = jwt.sign(
                {
                    username: loadedUser.username,
                    userId: loadedUser.id.toString()
                },
                'somesupersecretsecret',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token: token, userId: loadedUser.id.toString() }); // Se devuelve JSON con token e ID de usuario
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}