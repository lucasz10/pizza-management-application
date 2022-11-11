const { Schema, model } = require('mongoose');

const chefSchema = new Schema(
    {
        pizzas: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Pizza',
            },
        ],
    }
);

const Chef = model('Chef', chefSchema);

module.exports = Chef;