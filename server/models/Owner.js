const { Schema, model } = require('mongoose');

const ownerSchema = new Schema({
    // array of chefs
});

const Owner = model('Owner', ownerSchema);

module.exports = Owner;