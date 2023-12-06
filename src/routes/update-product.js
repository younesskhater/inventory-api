const auth = require('../authentication/auth');
const { Product } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
    app.put('/api/products/:id', auth, (req, res) => {
        const id = req.params.id;
        Product.update(req.body, { 
            where: { id: id }
            })
        .then(_ => {
            return Product.findByPk(id)
                .then(product => {
                    if (product === null) {
                        return res.status(404).json({ message: 'the product demanded doesn\'t exist, Please try with another Id' })
                    }
                    res.json({message: `product ${id} has been updated: `, data: product})
                })
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError) {
                if(error.errors.some(error => error.type === 'unique violation' && error.path === 'products_name_category')) {
                    return res.status(422).json({ message : 'the name of a product should be unique for the same category', error })
                }
            }
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message, error})
            }
            res.status(500).json({ message: 'We couldn\'t update the product, please try later', error })
        })
    })
}