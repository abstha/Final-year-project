const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      userName: {
        type: String,
        required: true,
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide',
        required: true,
      },
      guideName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
      },
    duration: {
        type: Number,
        required: true,
      },
    totalCost: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['requested', 'accepted', 'rejected', 'canceled'],
        default: 'requested',
        required: true,
      },
},{timestamps: true})

module.exports = mongoose.model("Booking", BookingSchema)