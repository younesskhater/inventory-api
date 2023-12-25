const express = require('express')
const auth = require('../../authentication/auth.js')
const router = express.Router()
const productsController = require('../../controllers/productsController.js')

router.route('/')
    .get(auth, productsController.getProducts)
    .post(auth, productsController.createProduct)
    .put(auth, productsController.updateProduct)
    .delete(auth, productsController.deleteProduct)

router.route('/:id')
    .get(auth, productsController.findProductById)
    
module.exports = router