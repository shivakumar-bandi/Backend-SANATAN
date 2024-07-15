const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    event:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User