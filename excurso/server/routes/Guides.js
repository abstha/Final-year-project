const router = require("express").Router()
const Guide = require('../models/Guide')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


//register all guides

router.post("/RegisterGuide", async(req,res) => {
    try{

        //generate pass

        const salt = await bcrypt.genSalt(10)
        const cryptedPass = await bcrypt.hash(req.body.password,salt)

        //create new guide

        const newGuide = new Guide({
            guideName: req.body.guideName,
            email: req.body.email,
            password: cryptedPass,
            availableLocations: req.body.availableLocations || [], // default to empty array if not provided
            hourlyRate: req.body.hourlyRate || 0, // default to 0 if not provided
            phone: req.body.phone|| ''
          });
        

        //save guide

        const savedGuide = await newGuide.save();

        // Return a success message and the newly created guide object
        res.status(201).json({
            message: 'Guide registered successfully',
            guide: savedGuide
        });
        console.log(`\x1b[42m%s\x1b[0m`,"added guide to DB");
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error registering guide' });
        console.log(`\x1b[41m%s\x1b[0m`,"failed adding guide to DB");
    }
})

//get all guides

router.get('/', async(req,res)=> {
    try{
        const guides = await Guide.find();
        console.log(`\x1b[42m%s\x1b[0m`,"finding all guides from DB");
        res.status(200).json(guides)
    }
    catch(err){
        console.log(`\x1b[41m%s\x1b[0m`,"failed to find all guides from DB");
        res.status(500).json(err)
    }
})


//login to guide

router.post('/loginGuide', async(req,res) =>{
    try{
        const guide = await Guide.findOne({guideName : req.body.guideName})

        if(!guide)
        {
            console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to guide");
            res.status(400).json("Wrong email or password")
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password, guide.password)
            if(!validPassword)
            {
                console.log(`\x1b[41m%s\x1b[0m`,"failed logging in to guide");
                res.status(400).json("Wrong email or password")
            }
            else{
                const token = jwt.sign(
                    {
                        guideName: guide.guideName
                    },
                    'secretkey'
                )
                const responseData = {
                    message: "Guide logged in succesfully",
                    guideName: guide.guideName,
                    token : token,
                    guideID: guide._id
                };
                console.log("succesfully logged in to guide")
                res.status(200).json(responseData)
            }
        }
    }
    catch(err)
    {
        console.log("failed logging in to guide")
        res.status(500).json(err)
    }
})

module.exports = router