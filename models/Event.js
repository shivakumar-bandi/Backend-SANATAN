
const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type:String
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    topics:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event