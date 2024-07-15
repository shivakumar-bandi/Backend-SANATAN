const express = require('express')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const userRoutes =require('./routes/userRoutes')
const bodyParser = require('body-parser');
const eventRoutes =require('./routes/eventRoutes')
const topicRoutes =require('./routes/topicRoutes')
const path =require('path')

const app = express();

const PORT = 4000;

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongo DB conncted successfully"))
.catch((error)=>console.log(error))

app.use(bodyParser.json())
app.use('/user', userRoutes)
app.use('/event', eventRoutes)
app.use('/topic', topicRoutes)
app.use('/uploads', express.static('uploads'))

app.listen(PORT, ()=>{
console.log(`server started running at ${PORT}`);
})

app.use('/home', (req, res)=>{
    res.send("<h1>Welcome to sanata dharm")
})

