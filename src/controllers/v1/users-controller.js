const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../../mongo/models/users-model');
const Products = require('../../mongo/models/products-model');

const expiresIn = 60 * 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID_PASSWORD', message: '' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: 'prueba' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username, password, email, data } = req.body;

    const hash = await bcrypt.hash(password, 15);
    await Users.create({
      username,
      password: hash,
      email,
      data
    });
    res.send({ status: 'OK', message: 'user create' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      res.status(400).send({ status: 'DUPLICATES_VALUE', message: e.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;
    await Users.findByIdAndDelete(userId);
    await Products.deleteMany({ user: userId });
    res.send({ status: 'OK', message: 'user delete' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await Users.find().select({ password: 0, __v: 0, role: 0 });
    res.send({ status: 'OK', data: users });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userId, {
      username,
      email,
      data
    });
    res.send({ status: 'OK', message: 'user update' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATES_VALUE', message: error.keyValue });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  login
};
