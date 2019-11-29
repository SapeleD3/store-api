const express = require('express')
const router = express.Router();
const itemController = require('../controllers/item')

// router.get('/')
router.get('/', itemController.getItems);
router.post('/', itemController.addItem);
router.get('/:id', itemController.getOneItem);
router.delete('/:id', itemController.deleteItem)

module.exports = router;