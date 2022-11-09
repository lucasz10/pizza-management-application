const { Schema, model } = require('mongoose');

const chefSchema = new Schema({
    
});

const Chef = model('Chef', chefSchema);

module.exports = Chef;