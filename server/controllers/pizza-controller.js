const { Pizza, User } = require('../models');

module.exports = {
  createPizza(req, res) {
    Pizza.create(req.body)
      .then((pizza) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { pizzas: pizza._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Pizza created, but found no user with that ID',
            })
          : res.json('Created the pizza 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getPizzas(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('__v')
      .then((user) => res.json(user.pizzas))
      .catch((err) => res.status(500).json(err));
  },
  deletePizza(req, res) {
    Pizza.findOneAndDelete({ _id: req.params.pizzaId })
      .then((pizza) =>
        !pizza
          ? res.status(404).json({ message: 'No pizza with this id!' })
          : User.findOneAndUpdate(
              { pizzas: req.params.pizzaId },
              { $pull: { pizzas: req.params.pizzaId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Pizza deleted but no user with this id!' })
          : res.json({ message: 'Pizza successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  updatePizza(req, res) {
    Pizza.findOneAndUpdate(
      { _id: req.params.pizzaId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((pizza) =>
        !pizza
          ? res.status(404).json({ message: 'No pizza with this id!' })
          : res.json(pizza)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
