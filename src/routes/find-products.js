const { Op } = require('sequelize')
const { Product } = require('../db/sequelize')
const auth = require('../authentication/auth')

module.exports = (app) => {
    app.get('/api/products', auth, (req, res) => {
        if (req.query.name) {
            const name = req.query.name
            Product.findAndCountAll({ 
                where: { 
                    name: {
                        // The %signs are wildcard characters that match any sequence of characters before and after the searchText
                        [Op.like]: `%${name}%`,
                    }
                },
                order: ['name'],
                limit: parseInt(req.query.limit) || 1,
                skip: parseInt(req.query.skip) || 0,
            })
            .then(products => res.json({ message: 'Products searched', data: products}))
        } else {
            Product.findAll({ order: ['name'] })
        .then(products => res.json({message: 'All products', data: products}))
        .catch(error => res.status(500).json({ message: 'Products list couldn\'t be retrieved, please retry later', error}))
        }
    })

}