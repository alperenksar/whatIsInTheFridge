const express = require('express');
const router = express.Router();
const { addItem, getItems } = require('../controllers/itemController');
const {deleteItem} = require('../controllers/itemController');




router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem', deleteItem);


module.exports = router;