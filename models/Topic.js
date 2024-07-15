
const mongoose = require('mongoose')

const topicSchema =new mongoose.Schema({
    topicName: {
        type: String,
        required: true
    },
    story: {
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
    event:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }]

});

const Topic = mongoose.model('Topic', topicSchema)

module.exports = Topic