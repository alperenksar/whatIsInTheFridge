const express = require('express');
const router = express.Router();
const { addItem, getItems  } = require('../controllers/itemController');



router.post('/addItem', addItem);
router.get('/getItems', getItems);


module.exports = router;