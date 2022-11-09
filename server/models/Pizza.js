const { Schema, model } = require('mongoose');

const pizzaSchema = new Schema({
    
});

const Pizza = model('Pizza', pizzaSchema);

module.exports = Pizza;