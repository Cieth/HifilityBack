const Router = require('express');

const {
  createProductHandler,
  showProductsHandler,
  showProductHandler,
  deleteProductHandler,
  buyProductHandler,
} = require('./product.controller');
const { auth } = require('../../utils/auth');
const router = Router();

router.get('/show', showProductsHandler);
router.get('/:productId', showProductHandler);
router.post('/create', createProductHandler);
router.post('/buy:productId', auth, buyProductHandler);
router.delete('/:productId', deleteProductHandler);

module.exports = router;
