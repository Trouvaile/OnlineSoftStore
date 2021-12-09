const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller.js');

router.get('/:categoriesName/:productsName', controller.index);
router.post('/search', controller.search);

module.exports = router;