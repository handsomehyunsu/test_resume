// for use of Router in express module, import express 
const express = require("express");

const userController = require('../controllers/user');

const router = express.Router();


router.post('/signup', userController.signup);


router.post("/login", userController.login);


module.exports = router;