const auth = require('../../authentication/auth')
const { Product } = require('../../db/sequelize')

module.exports = (app) => {
    app.delete('/api/products/:id', auth, (req, res) => {
        const id = req.params.id
        Product.findByPk(id).then(product => {
            if (product === null) {
                return res.status(404).json({ message: 'the product you want to delete doesn\'t exist, Please try with another Id' })
            }
            return Product.destroy({
                where: { id: id }
            })
            .then(_ => res.json({message: 'product has been deleted', data: product}))
        })
        .catch(error => res.status(500).json({ message: 'We couldn\'t delete the product, please try later', error }))
        
    })
}