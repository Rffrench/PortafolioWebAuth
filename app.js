// Auth Microservice. 
require('dotenv').config(); // .env files

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000

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


sequelize.sync()
    .then(result => {
        console.log(result);
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    })

console.log('sssdss');
