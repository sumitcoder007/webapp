
const { signup, login } = require('../controller/AuthController');
const { signupValidation, loginValidation } = require('../middelware/AuthValidation');

const router = require('express').Router();



router.post('/login',loginValidation, login);
router.post('/signup',signupValidation, signup);

module.exports = router;