// Controlador Microservicio Autenticación

const User = require('../models/userModel');

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    User.create({
        email: email,
        password: password,
        name: name
    })
        .then(result => {
            console.log(result);
            res.send('Ingresado');

        })
        .catch(err => {
            console.log(err);
        })

}