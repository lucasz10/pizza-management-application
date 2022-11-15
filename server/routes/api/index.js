const router = require('express').Router();
const userRoutes = require('./User-routes');
const toppingRoutes = require('./Topping-routes');
const pizzaRoutes = require('./Pizza-routes');

router.use('/user', userRoutes);
router.use('/topping', toppingRoutes);
router.use('/pizza', pizzaRoutes);

module.exports = router;
