const router = require('express').Router();

const {
  getToppings,
  createTopping,
  deleteTopping,
  updateTopping,
} = require('../../controllers/topping-controller');

// /api/topping
router
  .route('/topping')
  .get(getToppings)
  .post(createTopping)
  .put(updateTopping)
  .delete(deleteTopping);

module.exports = router;
