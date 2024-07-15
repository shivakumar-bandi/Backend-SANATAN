
const Event =require('../models/Event')
const User =require('../models/User')
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

const addEvent =async(req, res)=>{
   try {
    const { eventName, about, description} =req.body
    const image =req.file? req.file.filename: undefined;
    
        const user = await User.findById(req.userId);

        if(!user){
            res.status(404).json({message: "user not found"})
        }
    
        const event = new Event({
            eventName, 
            about, 
            description,
            image, 
            user: user._id
        })
        
      const savedEvent= await event.save();
       user.event.push(savedEvent)
       await user.save()

        return res.status(200).json({message: "Event added successfully"})
   } catch (error) {
    console.error(error);
    res.status(500).json("internal server error")
   }

}

const deleteEventById =async(req, res)=>{
    try {
        const eventId = req.params.eventId;
        const deletedTopic = await Event.findByIdAndDelete(eventId) 
        if(!deletedTopic){
            return res.status(404).json({error: "Topic not found"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json("internal server error")
    }
}



module.exports = {addEvent: [upload.single('image'), addEvent], deleteEventById}