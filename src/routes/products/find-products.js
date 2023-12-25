const auth = require('../../authentication/auth')
const { getProducts } = require('../../controllers/productsController')

module.exports = (app) => {
    app.get('/api/products', auth, getProducts)
}