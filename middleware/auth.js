const User = require('../models/user')
const jwt = require('jsonwebtoken');

exports.userAuth = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];

        try {
        const decode = jwt.verify(token,process.env.JWT_KEY);
        const user = await User.findById(decode.User_ID);  
        console.log(user)
        if(!user){
            res.send({ 
                success:false,
                message:'Token expired'
            })
        }
        res.send({
            success:true, 
            message:'Successful', 
            user,
        })
        req.user = user;
        next();
            
        } catch (err) {
            res.send({success:false , message: err.message})
        }
        
    }else{
        res.send({
            success:false,
            message:'unauthorized access!'
        })
    }

}