const router = require('express').Router();

const {
  getToppings,
  createTopping,
  deleteTopping,
  updateTopping,
} = require('../../controllers/topping-controller');

// /api/topping
router.route('/').post(createTopping).put(updateTopping).delete(deleteTopping);

router.route('/:userId').get(getToppings);
module.exports = router;
