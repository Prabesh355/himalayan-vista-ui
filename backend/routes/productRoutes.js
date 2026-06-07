const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', productController.getProducts);
router.get('/admin/all', protect, authorize('admin', 'vendor'), productController.getProductsAdmin);
router.post('/', protect, authorize('admin', 'vendor'), productController.createProduct);
router.put('/:id', protect, authorize('admin', 'vendor'), productController.updateProduct);
router.delete('/:id', protect, authorize('admin', 'vendor'), productController.deleteProduct);

module.exports = router;
