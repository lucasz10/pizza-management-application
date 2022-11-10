const router = require('express').Router();
const chefRoutes = require('./chef-routes');
const ownerRoutes = require('./owner-routes.js');

router.use('/chef', chefRoutes);
router.use('/owner', ownerRoutes);

module.exports = router;
