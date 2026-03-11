const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const { addItem, getItems } = require('../controllers/itemController');
=======
const { addItem, getItems  } = require('../controllers/itemController');
const { deleteItem } = require('../controllers/itemController');
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes



router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem', deleteItem);
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

module.exports = router;