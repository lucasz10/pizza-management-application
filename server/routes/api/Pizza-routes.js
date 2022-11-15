const router = require("express").Router();

const {
  getPizzas,
  createPizza,
  deletePizza,
  updatePizza,
} = require("../../controllers/pizza-controller");

// /api/pizza
router
  .route("/pizza")
  .get(getPizzas)
  .post(createPizza)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;
