const mongoose = require('mongoose')
const Joi = require('joi')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },

    email : {
        type: String,
        unique: true,
        required: true,
        max: 50,
    },

    password: {
        type: String,
        required: true,
        min: 6,
    },
    
    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


module.exports = mongoose.model("User", UserSchema)