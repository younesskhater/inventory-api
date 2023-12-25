const auth = require('../../authentication/auth')
const { deleteProduct } = require('../../controllers/productsController')

module.exports = (app) => {
    app.delete('/api/products/:id', auth, deleteProduct)
}