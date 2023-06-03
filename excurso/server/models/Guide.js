const mongoose = require('mongoose')

const GuideSchema = new mongoose.Schema({
    guideName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required:true
    },
    availableLocations:[String],
    hourlyRate: {
        type: Number,
        required: true,
        min: 0
    },
    phone: {
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Guide",GuideSchema)