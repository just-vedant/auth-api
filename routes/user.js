const express = require('express');
const { CreateUser, userSignIn} = require('../controllers/user')
const {validateUserSignUp, userValidation, ValidateUser} = require('../middleware/validation/user')
const router = express.Router();
const {userAuth} = require('../middleware/auth');

router.post('/create-user',validateUserSignUp,userValidation, CreateUser);
router.post('/sign-in',ValidateUser, userValidation, userSignIn);
router.post('/private-route',userAuth,(req, res) => {
    res.send('Welcome to the private route');
});

module.exports = router;