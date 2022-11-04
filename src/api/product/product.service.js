const Product = require('./product.model');

const createProduct = (data) => {
  return Product.create(data);
};

const showProducts = () => {
  return Product.find();
};

const showProduct = (id) => {
  return Product.findById(id);
};

const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = { createProduct, showProduct, showProducts, deleteProduct };
