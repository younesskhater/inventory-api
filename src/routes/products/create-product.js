const auth = require('../../authentication/auth')
const { createProduct } = require('../../controllers/productsController')

module.exports = (app) => {
    app.post('/api/products/create', auth, createProduct)
}