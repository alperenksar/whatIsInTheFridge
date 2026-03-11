const express = require('express');
const router = express.Router();
const { addItem, getItems, updateItem } = require('../controllers/itemController');
const {deleteItem} = require('../controllers/itemController');
const {getExpiringItems} = require('../controllers/itemController');
<<<<<<< Updated upstream
=======
const {filterWithName} = require('../controllers/itemController');
const {filterWithCategory} = require('../controllers/itemController');
>>>>>>> Stashed changes




router.post('/addItem', addItem);
router.get('/getItems', getItems);
router.delete('/deleteItem', deleteItem);
router.put('/updateItem', updateItem);
router.get('/getExpiringItems', getExpiringItems);
<<<<<<< Updated upstream
=======
router.get('/filterWithName', filterWithName);
router.get('/filterWithCategory', filterWithCategory);
>>>>>>> Stashed changes


module.exports = router;