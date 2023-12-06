const auth = require('../authentication/auth')
const { Product } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/products/:id', auth, (req, res) => {
        Product.findByPk(req.params.id)
        .then( product => { 
            if (product === null) {
                return res.status(404).json({ message: 'the product demanded doesn\'t exist, Please try with another Id' })
            }
            res.json({message: 'found the product by Id', data: product})
        })
        .catch(error => res.status(500).json({ message: 'We couldn\'t retrieve the product demanded, please try later', error }))
    })
}