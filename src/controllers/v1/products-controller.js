const Products = require('../../mongo/models/products-model');

const createProduct = async (req, res) => {
  try {
    const { title, desc, price, images, userId } = req.body;

    const product = await Products.create({
      title,
      desc,
      price,
      images,
      user: userId
    });
    res.send({ status: 'OK', data: product });
  } catch (e) {
    console.log('createProduct error', e);
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteProduct = (req, res) => {};

const getProduct = async (req, res) => {
  try {
    const products = await Products.find({
      price: { $gt: 10 }
    })
      .populate('user', 'username email role data')
      .select('title desc price');
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('getProduct error', e);
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    const products = await Products.find({
      user: req.params.userId
    });
    res.send({ status: 'OK', data: products });
  } catch (e) {
    console.log('getProductsByUser error', e);
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProductsByUser
};
