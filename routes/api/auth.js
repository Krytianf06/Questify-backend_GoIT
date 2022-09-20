const express = require('express')
const router = express.Router()

const {authorization} = require('../../service/valid/tokenValid');
const {register, logout} = require('../../controllers/auth/index');

router.post('/register',register);

router.post('/logout',authorization,logout);
// router.post('/login',login);


module.exports = router
