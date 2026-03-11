const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const { addItem, getItems } = require('../controllers/itemController');
=======
const { addItem, getItems  } = require('../controllers/itemController');
const { deleteItem } = require('../controllers/itemController');
>>>>>>> Stashed changes



router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem', deleteItem);

module.exports = router;