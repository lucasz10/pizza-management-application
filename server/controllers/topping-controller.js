const { Topping, Owner, Pizza } = require("../models");

module.exports = {
  createTopping(req, res) {
    Topping.create(req.body)
      .then((topping) => {
        return Owner.findOneAndUpdate(
          { _id: req.body.owner_Id },
          { $addToSet: { toppings: topping._id } },
          { new: true }
        );
      })
      .then((owner) =>
        !owner
          ? res
              .status(404)
              .json({
                message: "Topping created, but found no owner with that ID",
              })
          : res.json("Created the topping 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getToppings(req, res) {
    Owner.findOne({ _id: req.params.ownerId })
      .select("__v")
      .then((owner) => res.json(owner.toppings))
      .catch((err) => res.status(500).json(err));
  },
  deleteTopping(req, res) {
    Topping.findOneAndDelete({ _id: req.params.toppingId })
      .then((topping) => {
        return Pizza.deleteMany({ toppings: req.body.toppingName })    
      })
      .then(() => res.json({ message: "Topping and pizza recipes using the topping are deleted!" }))
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
