const { Pizza } = require('../models');

module.exports = {
  async createPizza(req, res) {
    try {
      const pizza = await Pizza.findOne({
        toppings: req.body.toppings,
        chef_id: req.session.user_id,
      });

      if (pizza) {
        return res.status(402).json({ message: 'Pizza already exists' });
      }

      if (req.session.logged_in && !req.session.isOwner) {
        await Pizza.create({
          pizzaName: req.body.pizzaName,
          toppings: req.body.toppings,
          chef_id: req.session.user_id,
        });

        return res
          .status(200)
          .json({ message: 'New Topping Created successfully!' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  },
  getPizzas(req, res) {
    Pizza.find({ chef_id: req.params.userId })
      .then((pizza) => res.json(pizza))
      .catch((err) => res.status(500).json(err));
  },
  deletePizza(req, res) {
    Pizza.findOneAndDelete({ _id: req.params.pizzaId })
      .then(() =>
        res.json({
          message: 'Pizza recipe is deleted!',
        })
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
