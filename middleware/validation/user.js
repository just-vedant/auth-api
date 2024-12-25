const {check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
    check('name').not().isEmpty().isString().isLength({min:3}).
    withMessage('Name should atlest have Three letters'),
    check('email').normalizeEmail().isEmail().not().isEmpty().withMessage('Invalid Email'),
    check('password').not().isEmpty().isString().isLength({min:3}).
    withMessage('Name should atlest have Three letters')
];

exports.userValidation=(req,res,next)=>{
    const result = validationResult(req).array();
    if(!result.length) return next();

    
    const err = result[0].msg;
    res.json({success:false, message:err})

}

exports.ValidateUser = [
    
    check('email').normalizeEmail().isEmail().not().isEmpty().withMessage('Invalid Email'),
    check('password').not().isEmpty().isString().isLength({min:3}).
    withMessage('Name should atlest have Three letters')
]