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
          .json({ message: 'New Pizza Created successfully!' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  },
  getPizzas(req, res) {
    Pizza.find({ chef_id: req.session.user_id })
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
  async updatePizza(req, res) {
    try {
      const topping = await Pizza.findOne({
        toppings: req.body.toppings,
        chef_id: req.session.user_id,
      });

      if (topping) {
        return res.status(402).json({ message: 'Pizza already exists' });
      }

      if (req.session.logged_in && req.session.isOwner) {
        await Pizza.findOneAndUpdate(
          { _id: req.params.pizzaId },
          { $set: req.body },
          { runValidators: true, new: true }
        );

        return res.status(200).json({ message: 'Pizza updated successfully!' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  },
};
