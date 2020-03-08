const express = require('express');

const productsController = require('../../controllers/v1/products-controller');

const router = express.Router();

router.post('/create', productsController.createProduct);
router.post('delete', productsController.deleteProduct);
router.get('/get-all', productsController.getProduct);
router.get('/get-by-user/:userId', productsController.getProductsByUser);

module.exports = router;
