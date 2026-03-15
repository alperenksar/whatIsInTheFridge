const express = require('express');
const router = express.Router();

const { addItem, getItems, updateItem } = require('../controllers/itemController');
const {deleteItem} = require('../controllers/itemController');
const {getExpiringItems} = require('../controllers/itemController');
const {filterWithName} = require('../controllers/itemController');
const {filterWithCategory} = require('../controllers/itemController');
const {getRecentlyBought} = require('../controllers/itemController');
const {getRecentlyUpdated} = require('../controllers/itemController');




router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem/:id', deleteItem);
router.put('/updateItem/:id', updateItem);
router.get('/getExpiringItems', getExpiringItems );
router.get('/filterWithName', filterWithName);
router.get('/filterWithCategory', filterWithCategory);
router.get('/getRecentlyBought', getRecentlyBought);
router.get('/getRecentlyUpdated', getRecentlyUpdated);


module.exports = router;