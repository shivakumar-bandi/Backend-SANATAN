const Topic =require('../models/Topic')
const Event =require('../models/Event')
const multer =require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    }
});
const upload =multer({ storage: storage });

const addTopic = async(req, res)=>{
    try {
        const {topicName, story, description} =req.body;
        const image =req.file? req.file.filename: undefined;

        const eventId = req.params.eventId;
        const event = await Event.findById(eventId);
        if(!event){
            res.status(404).json({message: "Topic not found"})
        }

        const topic = new Topic({
            topicName,
             story, 
             description,
             image,
             event: event._id
        });
        const savedTopic = await topic.save()

        event.topics.push(savedTopic)

        await event.save();
        res.status(200).json(savedTopic)

    } catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }

}

const getTopicByEvent = async(req,res)=>{
    try {
        const eventId = req.params.eventId;
        const event =await Event.findById(eventId);

        if(!event){
           return res.status(404).json({error: "Event not found"});
        }

        const sanatanName = event.eventName;
     const topics =await Topic.find({event: eventId});

     res.status(200).json({sanatanName, topics})

    } catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }
}

const deleteTopicById = async(req, res)=>{
    try {
        const eventId = req.params.eventId;
        const deletedTopic = await Topic.findByIdAndDelete(eventId) 
        if(!deletedTopic){
            return res.status(404).json({error: "Topic not found"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }
}


module.exports = {addTopic: [upload.single('image'), addTopic], getTopicByEvent, deleteTopicById}