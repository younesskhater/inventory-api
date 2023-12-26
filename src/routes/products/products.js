const express = require('express')
const router = express.Router()
const productsController = require('../../controllers/productsController.js')

router.route('/')
    .get(productsController.getProducts)
    .post(productsController.createProduct)
    .put(productsController.updateProduct)
    .delete(productsController.deleteProduct)

router.route('/:id')
    .get(productsController.findProductById)
    .put(productsController.updateProduct)
    
module.exports = router