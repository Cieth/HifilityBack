const {
  createProduct,
  showProduct,
  showProducts,
  deleteProduct,
} = require('./product.service');

const User = require('../user/user.model');
const Product = require('./product.model');

const createProductHandler = async (req, res) => {
  const data = req.body;
  try {
    const product = await createProduct(data);

    return res
      .status(201)
      .json({ message: 'Product created succesfully', data: product });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'List could not be created', error: error.message });
  }
};

const buyProductHandler = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    if (!user) {
      throw new Error('Invalid user');
    }
    const addProductUser = {
      ...user,
      products: product,
    };
    const newUser = await User.findByIdAndUpdate(productId, addProductUser);
    user.products.unshift(product);
    await user.save({ validateBeforeSave: false });
    return res
      .status(201)
      .json({ message: 'Product created successfully', data: newUser });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Product could not be created', error: error.message });
  }
};

const showProductOfUserHandler = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findById(userId).populate({
      path: 'products',
    });
    if (!user) throw new Error('Invalid user');

    return res.status(200).json({ message: 'Products:', data: user.products });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Product couldnt be fetched', error: error.message });
  }
};

const showProductsHandler = async (req, res) => {
  try {
    const products = await showProducts();

    if (products.length === 0) {
      return res.status(200).json({ error: 'No products found' });
    }

    return res.status(200).json({ message: 'Products found', data: products });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Products not found', data: error.message });
  }
};

const showProductHandler = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await showProduct(productId);
    if (!product) {
      throw new Error('Product does not exist');
    }
    return res.status(200).json({ message: 'Product: ', data: product });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Product could not be found', error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  const { productId } = req.params;
  const product = await showProduct(productId);
  if (!product) {
    return res.status(400).json({ error: 'Product is not valid' });
  }
  try {
    await deleteProduct(productId);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Product could not be deleted', error: error.message });
  }
};

module.exports = {
  createProductHandler,
  showProductsHandler,
  showProductHandler,
  deleteProductHandler,
  buyProductHandler,
  showProductOfUserHandler,
};
