const router = require('express').Router();

const {
  getToppings,
  createTopping,
  deleteTopping,
  updateTopping,
} = require('../../controllers/topping-controller');

// /api/topping
router.route('/').post(createTopping);

router.route('/:userId').get(getToppings);

router.route('/:toppingId').put(updateTopping).delete(deleteTopping);
module.exports = router;
