const { Schema, model } = require('mongoose');

const pizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
        },
        toppings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topping'
            }
        ],
    }
);

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;