const router = require('express').Router();

const {
  getPizzas,
  createPizza,
  deletePizza,
  updatePizza,
} = require('../../controllers/pizza-controller');

// /api/pizza
router.route('/').post(createPizza);

// /api/pizza/chef_id
router.route('/:chef_id').get(getPizzas);

// /api/pizza/pizzaId
router.route('/:pizzaId').put(updatePizza).delete(deletePizza);
module.exports = router;
