const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.CreateUser = async (req,res)=>{

    const {name, email, password, phonenumber, educationLevel, skillLevel, disabilityInfo, fieldOfStudy, date} = req.body;
    const isNewUser = await User.isThisEmailInUse(email);
    if(!isNewUser){
        return res.json({
            success:false,
            message:'This Email already exists, Try signing in.'
        })
    }
    const user = await User({
        name,
        email,
        password, 
        phonenumber,
        educationLevel,
        skillLevel,
        disabilityInfo,
        fieldOfStudy, 
        date
    })  
    await user.save()
    res.json({ success: true, user });
    // console.log(user)
}

exports.userSignIn = async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email:email});

    if(!user) return({success:false, message:'This user doesn\'t Exist'})


    const result = await user.comparePassword(password);

    if(!result) return({success:false,message:'Incorrect Password'});
    

    const token = jwt.sign({User_ID: user._id},process.env.JWT_KEY,{ 
        expiresIn: '1d',
    })

    res.json({sucess:true,user,token});

}