const { Topping, Pizza } = require('../models');

module.exports = {
  async createTopping(req, res) {
    try {
      const topping = await Topping.findOne({
        toppingName: req.body.toppingName,
        owner_id: req.session.user_id,
      });

      if (topping) {
        return res.status(402).json({ message: 'Topping already exists' });
      }

      if (req.session.logged_in && req.session.isOwner) {
        await Topping.create({
          toppingName: req.body.toppingName,
          owner_id: req.session.user_id,
        });

        return res
          .status(200)
          .json({ message: 'New Topping Created successfully!' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  },
  getToppings(req, res) {
    Topping.find({ owner_id: req.params.userId })
      .then((topping) => res.json(topping))
      .catch((err) => res.status(500).json(err));
  },
  deleteTopping(req, res) {
    Topping.findOneAndDelete({ _id: req.params.toppingId })
      .then((topping) => {
        return Pizza.deleteMany({ toppings: topping.toppingName });
      })
      .then(() =>
        res.json({
          message: 'Topping and pizza recipes using the topping are deleted!',
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  async updateTopping(req, res) {
    try {
      const topping = await Topping.findOne({
        toppingName: req.body.toppingName,
        owner_id: req.session.user_id,
      });

      if (topping) {
        return res.status(402).json({ message: 'Topping already exists' });
      }

      if (req.session.logged_in && req.session.isOwner) {
        await Topping.findOneAndUpdate(
          { _id: req.params.toppingId },
          { $set: req.body },
          { runValidators: true, new: true }
        );

        return res
          .status(200)
          .json({ message: 'Topping updated successfully!' });
      }
    } catch (err) {
      res.status(401).json(err);
    }
  },
};
