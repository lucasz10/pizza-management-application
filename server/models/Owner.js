const { Schema, model } = require('mongoose');

const ownerSchema = new Schema({
    
});

const Owner = model('Owner', ownerSchema);

module.exports = Owner;