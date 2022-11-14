const { Topping, User, Pizza } = require("../models");

module.exports = {
  createTopping(req, res) {
    Topping.create(req.body)
      .then((topping) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { toppings: topping._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Topping created, but found no user with that ID",
            })
          : res.json("Created the topping 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getToppings(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("__v")
      .then((user) => res.json(user.toppings))
      .catch((err) => res.status(500).json(err));
  },
  deleteTopping(req, res) {
    Topping.findOneAndDelete({ _id: req.params.toppingId })
      .then((topping) => {
        return Pizza.deleteMany({ where: { toppings: req.params.toppingId } });
      })
      .then(() =>
        res.json({
          message: "Topping and pizza recipes using the topping are deleted!",
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
          ? res.status(404).json({ message: "No topping with this id!" })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },
};
