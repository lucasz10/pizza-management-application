const router = require('express').Router();

const {
  getPizzas,
  createPizza,
  deletePizza,
  updatePizza,
} = require('../../controllers/pizza-controller');

// /api/pizza
router.route('/').post(createPizza).put(updatePizza).delete(deletePizza);

router.route('/:userId').get(getPizzas);

module.exports = router;
