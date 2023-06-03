const router = require("express").Router();
const booking = require("../models/Booking");
const nodemailer = require("nodemailer");
const User = require("../models/user");

require("dotenv").config();

// handle new booking

router.post("/", async (req, res) => {
  try {
    const newBooking = new booking({
      user: req.body.userId,
      userName: req.body.userName,
      guide: req.body.guideId,
      guideName: req.body.guideName,
      date: req.body.date,
      duration: req.body.duration,
      totalCost: req.body.totalCost,
      status: "requested", // Set the status to "requested" by default
    });

    const bookingSaved = await newBooking.save();
    console.log("Booking has been confirmed");

    // Fetch the user from the database using the userID
    const user = await User.findById(req.body.userId);

    // Create the nodemailer transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email, // Set the email to the user's email
      subject: "Booking Status",
      html: `<p>Hello ${req.body.userName},</p>
                 <p>Your booking details:</p>
                 <ul>
                   <li>guideName: ${req.body.guideName}</li>
                   <li>Date: ${req.body.date}</li>
                   <li>Duration: ${req.body.duration} hours</li>
                   <li>Total Cost: Rs. ${req.body.totalCost}</li>
                   <li>Status : ${req.body.status}</li>
                 </ul>
                 <p>The Confirmation or Rejection of the booking might take 1-2 business days</p>
                 <p>Please check your requests dashboard to view the status of your booking</p>
                 <p>Thank you for booking with us!</p>`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json(bookingSaved);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get all bookings for a specific guide
router.get("/", async (req, res) => {
  try {
    const { guideId } = req.query;
    const bookings = await booking.find({ guide: guideId });
    res.status(200).json(
      bookings.map((booking) => ({
        _id: booking._id,
        user: booking.user,
        userName: booking.userName,
        guide: booking.guide,
        guideName: booking.guideName,
        date: booking.date,
        duration: booking.duration,
        totalCost: booking.totalCost,
        status: booking.status,
      }))
    );
  } catch (err) {
    console.log("Failed finding bookings for guide", guideId);
    res.status(500).json(err);
  }
});

//get bookings made by a specific user

router.get("/getRequests", async (req, res) => {
  try {
    const { userId } = req.query;
    const bookings = await booking.find({ user: userId });
    res.status(200).json(
      bookings.map((booking) => ({
        _id: booking._id,
        user: booking.user,
        userName: booking.userName,
        guide: booking.guide,
        guideName: booking.guideName,
        date: booking.date,
        duration: booking.duration,
        totalCost: booking.totalCost,
        status: booking.status,
      }))
    );
  } catch (err) {
    console.timeLog("failed finding bookings for current user");
    res.status(500).json(err);
  }
});

// Update a booking's status
router.put("/:id", async (req, res) => {
  try {
    const bookings = await booking.findById(req.params.id);

    if (!bookings) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    bookings.status = req.body.status;
    await bookings.save();

    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
