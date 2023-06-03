const mongoose = require('mongoose')

const DestinationSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    popular_for: { 
        type: String, required: true 
    },
    imageUrl: { 
        type: String 
    },
    imagePublicId: { 
        type: String 
    },
    category: { 
        type: String 
    },
    description: { 
        type: String 
    }
})

module.exports = mongoose.model("Destinations",DestinationSchema)