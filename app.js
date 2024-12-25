const express = require('express');
require('dotenv').config();
const User = require('./models/user')
require('./models/db');
const userRouter = require('./routes/user');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const options = {
    key: fs.readFileSync('server.key'), // Path to your private key
    cert: fs.readFileSync('server.cert'), // Path to your certificate
};

const app = express();
app.use(cors());

app.use(express.json())
app.use(userRouter);


// const SignIn = async (email,password) =>{
//     const user = await User.findOne({email:email});
//     const result = await user.comparePassword(password);
//     console.log(result);
// }

// SignIn('vedantsakpal@gmail.com','1234');

app.get('/test ',(req,res)=>{
    res.send("Hello world")
})

app.get('/',(req,res)=>{
    res.json({success:true,message:'Welcoms to the backend!!!'})
})


// app.listen(8000,()=>{
//     console.log("port is listening")
// })

https.createServer(options, app).listen(8000, () => {
    console.log('Server is running at https://localhost:8000');
});  