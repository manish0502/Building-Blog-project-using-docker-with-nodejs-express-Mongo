const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username:{
        type: String,
        required:[true ,"User must have valid username"],
        unique: true
    },
    password:{
        type: String,
        required:[true ,"User must have Password"],
    }

})

const User = mongoose.model('User',userSchema);

module.exports = User;