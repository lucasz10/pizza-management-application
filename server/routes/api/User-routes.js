const router = require('express').Router();

const {
  createUser,
  login,
  logout,
  getOwnerStatus,
  getLoggedInStatus,
} = require('../../controllers/user-controller');

// /api/user/createUser
router.route('/createUser').post(createUser);

// /api/user/login
router.route('/login').post(login);

// /api/user/logout
router.route('/logout').post(logout);

// /api/user/isLoggedIn
router.route('/isLoggedIn').get(getLoggedInStatus);

// /api/user/isOwner
router.route('/isOwner').get(getOwnerStatus);

module.exports = router;
