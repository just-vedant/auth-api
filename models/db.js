const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database is Connected')
}).catch((err)=>{console.log(err.message)})