const { Schema, model } = require('mongoose');

const toppingSchema = new Schema({
    
});

const Topping = model('Topping', toppingSchema);

module.exports = Topping;