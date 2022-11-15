const { Schema, model } = require('mongoose');

const pizzaSchema = new Schema({
  pizzaName: {
    type: String,
    required: true,
  },
  toppings: [
    {
      type: String,
    },
  ],
  chef_id: {
    type: String,
  },
});

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;
