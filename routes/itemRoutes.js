const express = require('express');
const router = express.Router();
const { addItem, getItems, updateItem } = require('../controllers/itemController');
const {deleteItem} = require('../controllers/itemController');
const {getExpiringItems} = require('../controllers/itemController');
const {filterWithName} = require('../controllers/itemController');




router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem', deleteItem);
router.put('/updateItem', updateItem);
router.get('/getExpiringItems', getExpiringItems);
router.get('/filterWithName', filterWithName);


module.exports = router;