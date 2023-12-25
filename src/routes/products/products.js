const express = require('express')
const router = express.Router()

router.route('/')
    .get()
    .post()
    .put()
    .delete()

router.route('/:id')
    .get()

    const productsRoutes = (app) => {
        // endpoints for products
        require('./find-products.js')(app)
        require('./find-product.js')(app)
        require('./create-product.js')(app)
        require('./update-product.js')(app)
        require('./delete-product.js')(app)
    
    }
    
    module.exports = productsRoutes