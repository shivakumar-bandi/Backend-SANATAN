const express =require('express');
const eventController = require('../controllers/eventController')
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router()

router.post('/add-event', verifyToken, eventController.addEvent);

router.get('/uploads/:imageName', (req, res)=>{
    const imageName =req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

  router.delete('/:eventId', eventController.deleteEventById)

module.exports = router;


