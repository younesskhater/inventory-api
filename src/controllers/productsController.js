const { Product } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize')

const getProducts = (req, res) => {
    if (req.query.name) {
        const name = req.query.name
        Product.findAndCountAll({ 
            where: { 
                name: {
                    // The %signs are wildcard characters that match any sequence of characters before and after the searchText
                    [Op.like]: `%${name}%`,
                }
            },
            order: ['name'],
            limit: parseInt(req.query.limit) || 1,
            skip: parseInt(req.query.skip) || 0,
        })
        .then(products => res.json({ message: 'Products searched', data: products}))
    } else {
        Product.findAll({ order: ['name'] })
    .then(products => res.json({message: 'All products', data: products}))
    .catch(error => res.status(500).json({ message: 'Products list couldn\'t be retrieved, please retry later', error}))
    }
}

const findProductById = (req, res) => {
    Product.findByPk(req.params.id)
    .then( product => { 
        if (product === null) {
            return res.status(404).json({ message: 'the product demanded doesn\'t exist, Please try with another Id' })
        }
        res.json({message: 'found the product by Id', data: product})
    })
    .catch(error => res.status(500).json({ message: 'We couldn\'t retrieve the product demanded, please try later', error }))
}

const createProduct = (req, res) => {
    Product.create(req.body)
    .then(product => res.json({message: 'product has been created', data: product}))
    .catch(error => {
        if (error instanceof UniqueConstraintError) {
            if(error.errors.some(error => error.type === 'unique violation' && error.path === 'products_name_category')) {
                return res.status(422).json({ message : 'the name of a product should be unique for the same category', error })
            }
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        
        res.status(500).json({ message: 'We couldn\'t create the product, please try later', error })
    })
}

const updateProduct = (req, res) => {
    const id = req.params.id;
    Product.update(req.body, { 
        where: { id: id }
        })
    .then(_ => {
        return Product.findByPk(id)
            .then(product => {
                if (product === null) {
                    return res.status(404).json({ message: 'the product demanded doesn\'t exist, Please try with another Id' })
                }
                res.json({message: `product ${id} has been updated: `, data: product})
            })
    })
    .catch(error => {
        console.log(error)
        if (error instanceof UniqueConstraintError) {
            if(error.errors.some(error => error.type === 'unique violation' && error.path === 'products_name_category')) {
                return res.status(422).json({ message : 'the name of a product should be unique for the same category', error })
            }
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        res.status(500).json({ message: 'We couldn\'t update the product, please try later', error })
    })
}

const deleteProduct = (req, res) => {
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
    
}

module.exports = { getProducts, findProductById, createProduct, updateProduct, deleteProduct }