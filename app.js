// Auth Microservice. 
require('dotenv').config(); // .env files

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000

const User = require('./models/userModel');
const UserRole = require('./models/userRole');

// Database
const sequelize = require('./util/database');

// Routes
const authRoutes = require('./routes/authRoutes');

// Adding middleware (these are executed for every request)
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Using the routes
app.use('/api/v1', authRoutes);


app.get('/', (req, res, next) => {
    res.send('Hey from AWS');
})

// Se definen las relaciones. Necesario usando Sequelize
User.belongsTo(UserRole, { as: 'role' });


sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })
