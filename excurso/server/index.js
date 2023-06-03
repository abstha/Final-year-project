const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")
const adminRoute = require("./routes/Admin")
const guideRoute = require("./routes/Guides")
const destinationRoute = require('./routes/Destinations')
const bookingRoute = require("./routes/Bookings")
const recommendationRoute = require("./routes/Recommendation")

const cors = require("cors")

const application = express();
application.use(express.json())
application.use(cors());
env.config();

const port = 5000;

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=>{
        console.log('\x1b[42m%s\x1b[0m',"successfully connected to DB");
    })
    .catch((err) =>{
        console.log('\x1b[41m%s\x1b[0m',"failed to connect to db")
    })

application.use("/api/pins", pinRoute)
application.use("/api/users",userRoute)
application.use("/api/admin", adminRoute)
application.use("/api/guides", guideRoute)
application.use("/api/destinations", destinationRoute)
application.use("/api/bookings", bookingRoute)
application.use("/api/recommendation", recommendationRoute)


application.listen(port,() => {
    console.log('\x1b[42m%s\x1b[0m','listening to port : 5000 ')
    console.log('\x1b[42m%s\x1b[0m','backend server connected')
})
