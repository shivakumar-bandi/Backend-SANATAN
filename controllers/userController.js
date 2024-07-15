const User = require('../models/User')
const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotEnv =require('dotenv')

dotEnv.config();

const secretKey =process.env.WhatIsYourName

const userRegister = async(req, res)=>{
    const {userName, email, password} =req.body;

    try {
        const userEmail = await User.findOne({email});
        if(userEmail){
            return res.status(400).json("Email already taken");
        }
const hashedPassword = await bcrypt.hash(password, 10)

const newUser = new User({
    userName,
    email,
    password:hashedPassword
});
await newUser.save()
res.status(201).json({message: "User registerd successfully!"})
console.log("registered");
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const userLogin =async(req, res)=>{
    const {email,password} =req.body
    try {
        const user =await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error: "Invalid usename or password"})
        }

const token =jwt.sign({ userId: user._id },secretKey, {expiresIn: "1hr"} )

            res.status(200).json({ success : "Login successful", token });
            console.log(email, "this is token", token);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}
const getAllUsers =async(req, res)=>{
    try {
        const users = await User.find().populate('event');
        res.json({users})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}

const getUserById =async(req, res)=>{
    const userId = req.params.id;
    try {
        const user = await User.findById(userId).populate('event');
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        res.status(200).json({user})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}

module.exports = { userRegister , userLogin, getAllUsers, getUserById}