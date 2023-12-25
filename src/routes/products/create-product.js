const auth = require('../../authentication/auth')
const { Product } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

module.exports = (app) => {
    app.post('/api/products/create', auth, (req, res) => {
        Product.create(req.body)
        .then(product => res.json({message: 'product has been created', data: product}))
        .catch(error => {
            if (error instanceof UniqueConstraintError) {
                if(error.errors.some(error => error.type === 'unique violation' && error.path === 'products_name_category')) {
                    return res.status(422).json({ message : 'the name of a product should be unique for the same category', error })
                }
            }
            if (error instanceof ValidationError) {
                return res.status(400).json({message: error.message, error})
            }
            
            res.status(500).json({ message: 'We couldn\'t create the product, please try later', error })
        })
    })
}