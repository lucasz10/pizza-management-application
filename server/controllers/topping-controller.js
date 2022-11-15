const { Topping, User, Pizza } = require('../models');

module.exports = {
  async createTopping(req, res) {
    if (req.session.logged_in && req.session.isOwner) {
      const newTopping = await Topping.create(req.body);

      if (!newTopping) {
        return res.status(400).json({ message: 'Unable to create topping' });
      }

      await User.findOneAndUpdate(
        { _id: req.session.user_id },
        { $addToSet: { toppings: newTopping._id } }
      );

      return res
        .status(200)
        .json({ message: 'New Topping Created successfully!' });
    }
  },
  getToppings(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  deleteTopping(req, res) {
    Topping.findOneAndDelete({ _id: req.params.toppingId })
      .then((topping) => {
        return Pizza.deleteMany({ where: { toppings: topping._id } });
      })
      .then(() =>
        res.json({
          message: 'Topping and pizza recipes using the topping are deleted!',
        })
      )
      .catch((err) => res.status(500).json(err));
  },
  updateTopping(req, res) {
    Topping.findOneAndUpdate(
      { _id: req.params.toppingId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((course) =>
        !course
          ? res.status(404).json({ message: 'No topping with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
