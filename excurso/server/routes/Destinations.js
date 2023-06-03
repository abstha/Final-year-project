const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = require("express").Router()
const Destinations = require('../models/Destination')

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dnveofphd",
  api_key: "257999736552778",
  api_secret: "BMGLacLb_H25gxrrkMuQotQtcYY"
});

// configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// configure multer upload
const upload = multer({ storage: storage }).single('image');

// Handle POST request to add a destination
router.post('/addDest', upload, async (req, res) => {
  try {
    // Get destination data from request body
    const { name, popular_for, category, description } = req.body;
    // Get image file data from request file
    const { path } = req.file;

    // Upload image file to cloudinary
    const result = await cloudinary.uploader.upload(path);

    // Create new destination document
    const newDest = new Destinations({
      name,
      popular_for,
      category,
      description,
      imageUrl: result.secure_url,
      imagePublicId: result.public_id
    });

    // Save destination document to database
    await newDest.save();

    // Send success response
    res.status(201).json({ message: 'Destination added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
});

//update destinations

// define PUT endpoint for updating a destination
router.put('/updateDestination', async (req, res) => {
  try {
    const { name, popular_for, category, description } = req.body;
    
    // validate input
    if (!name || !popular_for || !category || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // find destination by ID and update it
    const destination = await Destinations.findByIdAndUpdate(
      req.body._id,
      { name, popular_for, category, description },
      { new: true }
    );

    // return updated destination
    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
//delete destination

router.delete('/deleteDestination/:id', async (req, res) => {
  try {
    const destination = await Destinations.findByIdAndDelete(req.params.id);
    res.status(200).json(destination);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Handle GET request to retrieve all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destinations.find();
    res.json(destinations);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error.');
  }
});


module.exports = router