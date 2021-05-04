const express = require('express');

const authController = require("../controllers/authController");

const router = express.Router();

router
.route('/')
.post(authController.signUp)

router
.route('/login')
.post(authController.login)


module.exports =router;