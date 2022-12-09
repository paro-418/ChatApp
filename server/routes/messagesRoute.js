const {getAllMessage,addMessage} = require('../controllers/messagesController.js');

const router = require('express').Router();

router.post('/addMessage', addMessage);
router.post('/allMessages', getAllMessage);


module.exports = router;
