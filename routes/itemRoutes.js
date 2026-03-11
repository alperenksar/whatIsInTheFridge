const express = require('express');
const router = express.Router();
const { addItem, getItems } = require('../controllers/itemController');


// Bu rotalar artık verifyToken ile korunuyor!
router.post('/', addItem);
router.get('/', getItems);

module.exports = router;