const express = require('express');
const userController = require('../../controllers/v1/users-controller');
const { isAuth, isValidHosname, isAdmin } = require('../../middlewares/auth');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create', userController.createUser);
router.post('/update', isValidHosname, isAuth, userController.updateUser);
router.post('/delete', isAuth, isAdmin, userController.deleteUser);
router.get('/get-all', isAuth, isAdmin, userController.getUser);

module.exports = router;
