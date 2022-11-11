const { Schema, model } = require('mongoose');

const ownerSchema = new Schema(
    {
        chefs: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Chef',
            },
        ],
        toppings: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Topping',
            }
        ]
    }
);

const Owner = model('Owner', ownerSchema);

module.exports = Owner;