const auth = require('../../authentication/auth');
const { updateProduct } = require('../../controllers/productsController');

module.exports = (app) => {
    app.put('/api/products/:id', auth, updateProduct)
}