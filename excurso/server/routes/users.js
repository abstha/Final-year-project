const router = require("express").Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const verifyToken = require("../middleware/verifytoken")


router.post("/register", async(req,res) => {
  try{
      //generate pass

      const salt = await bcrypt.genSalt(10)
      const cryptedPass = await bcrypt.hash(req.body.password,salt)

      //create new user

      const newUser = new User({
          userName : req.body.userName,
          email : req.body.email,
          password : cryptedPass
      })

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ $or: [{ userName: newUser.userName }, { email: newUser.email }] });
      if (existingUser) {
          throw new Error('User already exists.');
      }

      //push user to dB

      const userSaved = await newUser.save()
      console.log(`\x1b[42m%s\x1b[0m`,"added user to DB");
      res.status(200).json(userSaved._id)
  }
  catch(err){
      console.log(`\x1b[41m%s\x1b[0m`,"failed adding user to DB");
      res.status(500).json(err.message)
  }
})

//get all users

router.get('/', async(req,res) => {
    try{
        const users = await User.find();
        console.log(`\x1b[42m%s\x1b[0m`,"finding all users from DB");
        res.status(200).json(users)
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed to find all users from DB");
        res.status(500).json(err)
    }
})



//Login

router.post('/login', async(req,res) => {
    try{
        const user = await User.findOne({userName: req.body.userName})

        if(!user)
        {
            console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to user");
            res.status(400).json("Wrong username or password")
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword){
                console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to user");
                res.status(400).json("wrong username or password")
            }
            else{
                const token = jwt.sign(
                    {
                        userName: user.firstName
                    },
                    'secretkey'
                )
                const responseData = {
                    message: 'User logged in successfully',
                    userName: user.userName,
                    token: token,
                    userID : user._id
                  };
                console.log(`\x1b[42m%s\x1b[0m`,"success loggin in to user");
                res.status(200).json(responseData)
                
            }
        }
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed logging in user");
        res.status(500).json(err)
    }
})


//verify token

router.post('/verify', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const decodedToken = jwt.verify(token, 'secretkey');
      // Perform any additional validation on the decoded token, like checking the user ID
      return res.status(200).json({ message: 'Token is valid' });
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  })


// delete user

router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).send({ error: 'User not found' });
      }
      res.send(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Server error' });
    }
  });

//get specific user
router.get('/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({userName: username});
    if (!user) {
      res.status(404).json({ error: `User not found` });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router