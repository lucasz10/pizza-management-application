const router = require('express').Router();

const {
  getPizzas,
  createPizza,
  deletePizza,
  updatePizza,
} = require('../../controllers/pizza-controller');

// /api/pizza
router.route('/').get(getPizzas).post(createPizza);

// /api/pizza/:userId
// router.route('/')

// /api/pizza/pizzaId
router.route('/:pizzaId').put(updatePizza).delete(deletePizza);
module.exports = router;
