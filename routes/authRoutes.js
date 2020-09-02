const express = require('express');
const router = express.Router();

const app = express();

const authController = require('../controllers/authController');

router.post('/auth/login', authController.postLogin);


module.exports = router;