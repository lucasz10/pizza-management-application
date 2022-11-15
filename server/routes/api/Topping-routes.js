const router = require('express').Router();

const {
  getToppings,
  createTopping,
  deleteTopping,
  updateTopping,
} = require('../../controllers/topping-controller');

// /api/topping
router.route('/').post(createTopping);

// /api/topping/:userId
router.route('/:userId').get(getToppings);

// /api/topping/:toppingId
router.route('/:toppingId').put(updateTopping).delete(deleteTopping);
module.exports = router;
