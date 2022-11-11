const { Schema, model } = require('mongoose');

const chefSchema = new Schema({
    // array of pizzas
});

const Chef = model('Chef', chefSchema);

module.exports = Chef;