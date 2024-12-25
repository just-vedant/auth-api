const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true, // Ensures user_id is unique
        default: function () {
            return new mongoose.Types.ObjectId().toString(); // Generate a unique string if not provided
        },
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/.+\@.+\..+/, 'Please use a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    educationLevel:{
        type:String,
    },
    skillLevel:{
        type:String,
    },
    phonenumber:{
        type:Number,
    },
    fieldOfStudy: {
        type: String,
    },
    disabilityInfo:{
        type:[String],
    },
    date: {
        type: Date,
    }
});

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.hash(this.password,8,(err,hash)=>{
            if(err) return next(err);

            this.password = hash;
            next();
        })
    }
})

userSchema.methods.comparePassword = async function(password){
    if(!password) throw new Error('Password is missing, cannot compare!');

    try{
        const result = bcrypt.compare(password,this.password)
        return result;
    }catch(err){
        console.log(err.message);
    }
}

userSchema.statics.isThisEmailInUse = async function(email){
    if(!email) throw new Error("No Email given")
    try{
        const user = await this.findOne({email:email});
        if(user){
            return false;
        }else{
            return true;
        }
    }catch(err){
        console.log("error in isThisEmailInUse",err.message);
        return true;
    }
}


module.exports = mongoose.model('User',userSchema);