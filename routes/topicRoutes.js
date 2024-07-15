
const express =require('express')

const topicController = require('../controllers/topicController')


const router =express.Router();

router.post('/add-topic/:eventId', topicController.addTopic);
router.get('/:eventId/topics', topicController.getTopicByEvent );

router.get('/uploads/:imageName', (req, res)=>{
    const imageName =req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:topicId', topicController.deleteTopicById)

module.exports = router;

