const router = require("express").Router()

const Pin = require("../models/pin")

//create a pin

router.post('/', async(req,res) => {
    const pinCandidate = new Pin(req.body)

    try{
        const savedPin = await pinCandidate.save()
        res.status(200).json(savedPin)
        console.log(`\x1b[42m%s\x1b[0m`,"added pin to DB");
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed to add pin to DB");
        res.status(500).json(err)
    }
})

// //get all pins

router.get('/getPins', async(req,res) => {
    try{
        const pins = await Pin.find();
        console.log(`\x1b[42m%s\x1b[0m`,"finding all pin from DB");
        res.status(200).json(pins)
        // console.log(pins);
        
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed finding all pin from DB");
        res.status(500).json(err)
    }
})

// get user details accordiing to the current user

router.get('/', async(req,res) => {
    try{
        const username = req.headers.authorization.split(' ')[1]; // get current user's username from local storage
        const pins = await Pin.find({ userName: username }); // find pins created by the current user only
        console.log(`\x1b[42m%s\x1b[0m`,"finding all pin from DB");
        res.status(200).json(pins)
        // console.log(pins);
        
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed finding all pin from DB");
        res.status(500).json(err)
    }
})

//get pins of the current user from user ID

// router.get('/:id',async(req,res) => {
//     try {
//         // Find the user in the database using their username
//         const user = await User.findOne({ username });

//         const userId = req.params.id; // get user id from the request parameter
//         const pins = await Pin.find({ user: userId }); // find pins for the current user
        
//         res.json(pins); // return the pins as a JSON response
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error');
//     }
// })

//get bookamrks by username

router.get('/:username', async(req,res) => {
    try {
      const username = req.params.username;
      const pins = await Pin.find({ userName: username }); // find all pins created by the user with the given username
      res.json(pins); // return the pins as a JSON response
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//save bookmarks

router.post('/bookmarks', async (req, res) => {
    const { userName, title, rating, lat, lon, descr } = req.body;
  
    try {
      const pin = new Pin({
        userName,
        title,
        rating,
        lat,
        lon,
        descr
      });
  
      const savedPin = await pin.save();
      console.log(`\x1b[42m%s\x1b[0m`,"success adding pin to DB");
      res.status(201).json(savedPin);
    } catch (error) {
      console.error('Error adding bookmark:', error);
      res.status(500).json({ error: 'An error occurred while adding the bookmark.'});
    }
});


module.exports = router