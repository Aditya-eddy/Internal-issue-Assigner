const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    admin : {
        type : Boolean,
        required : true
    }
})

const UserDetails = mongoose.model('UserDetails',UserSchema)

module.exports = {UserDetails};