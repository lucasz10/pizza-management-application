const { Chef } = require('../models');

module.exports = {
    
    async getAllChefs(req, res) {
        const allChefs = await Chef.find({})

        if(!allChefs) {
            return res.status(400).json({ message: 'No chefs found!' });
        }
        res.status(200).json(allChefs);
    },
    async createChef ({ body }, res) {
        const newChef = await Chef.create(body)

        
    }
};