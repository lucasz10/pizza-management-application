const router = require('express').Router();

const { createUser, login } = require('../../controllers/user-controller');

// /api/user/createUser
router.route('/createUser').post(createUser);

// /api/user/login
router.route('/login').post(login);

module.exports = router;
