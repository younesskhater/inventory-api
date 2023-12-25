const auth = require('../../authentication/auth')
const { findProductById } = require('../../controllers/productsController')

module.exports = (app) => {
    app.get('/api/products/:id', auth, findProductById)
}