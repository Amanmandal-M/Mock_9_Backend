const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// Models location
const { userModel } = require('../models/userModel');


// This endpoint should allow users to register. Hash the password on store.
const registerUserController = async (req,res) => {
    const { 
            name,
            email,
            password,
            dob,
            bio,
            posts,
            friends,
            friendRequests
        } = req.body;

    if(email=="" || password=="") return res.status(501).json("Enter all fields");

    try {
        const isPresent = await userModel.findOne({email});
        if(isPresent) return res.status(401).send({
            "Message":"User already exists"
        });

        bcrypt.hash(password , 5 , async (err,hash)=>{
            if(err) return res.status(500).send({
                "Message":"Contact to administrator"
            })

            const data = new userModel({ 
                name,
                email,
                password:hash,
                dob,
                bio,
                posts,
                friends,
                friendRequests
            });
            await data.save();

            res.status(201).send({
                "Message":"User Registered Successfully",
                "Data": data
            })
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message": error.message
        })
    }
};

// This endpoint should allow users to login. Return JWT token on successful login.
const loginUserController = async (req,res) => {
    const { email, password } = req.body;

    if(email=="" || password=="") return res.status(501).json("Enter all fields");

    try {
        const isPresent = await userModel.findOne({email: email});
        if(!isPresent) return res.status(401).send({
            "Message":"User not found"
        });
    
        const hashedPassword = isPresent?.password;
    
        bcrypt.compare(password, hashedPassword,(err,result)=>{
            if(!result) return res.status(404).send({
                "Message":"login failed"
            });
                
            const Normal_Token = jwt.sign({"masai":"masai"}, process.env.NORMAL_KEY,{expiresIn:"7d"});
                    
            res.cookie("Normal_Token", Normal_Token);
    
            res.status(201).send({
                "Message":"Login successful",
                "Token": Normal_Token,
                "Data" : isPresent
            });
        });    
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        })
    }
};

// This endpoint should return a list of all registered users. 
const allRegisteredUserController = async (req,res) => {
    try {
        const data = await userModel.find().populate('User').populate('Post');
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        })
    }
};

// This endpoint should return a list of all friends of a specific user identified by its ID.
const friendsOfSingleUserController = async (req,res) => {
    const Id = req.params.id;
    try {
        const isPresent = await userModel.findOne({_id:Id});
        const data =  isPresent.friends().populate('User');

        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};

// This endpoint should allow the user to send a friend request to another user identified by its ID. (Protected Route)
const sendFriendRequestToSingleUserController = async (req,res) => {
    const Id = req.params.id;
    const payload = req.body;
    try {

        const isPresent = await userModel.findById(Id);
        const data = isPresent.friends.push(payload);

        const userData = userModel.findByIdAndUpdate({_id:Id},isPresent);
        await userData.save();
        res.status(201).json("Friend Request sent successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};

// This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID. (Protected Route)
const acceptRejectRequestUserController = async (req,res) => {
    const Id = req.params.id;
    const fId = req.params.friendId;
    const payload = req.body;    
    try {

        const isPresent = await userModel.findOne({_id:Id});

        if(!isPresent) return res.status(404).json("User not found");

        const data = await userModel.findByIdAndUpdate({_id:Id, friendId:fId},{friendRequests:payload})
        
        res.status(204).json("User accepted friend request")
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            "Message":error.message
        });
    }
};

module.exports = {
                    registerUserController,
                    loginUserController,
                    allRegisteredUserController,
                    friendsOfSingleUserController,
                    sendFriendRequestToSingleUserController,
                    acceptRejectRequestUserController
                 };