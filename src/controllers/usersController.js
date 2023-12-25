const { Product } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize')

const getUsers = (req, res) => {
    if (req.query.firstName) {
        const firstName = req.query.firstName
        Product.findAndCountAll({ 
            where: { 
                firstName: {
                    // The %signs are wildcard characters that match any sequence of characters before and after the searchText
                    [Op.like]: `%${firstName}%`,
                }
            },
            order: ['firstName'],
            limit: parseInt(req.query.limit) || 1,
            skip: parseInt(req.query.skip) || 0,
        })
        .then(users => res.json({ message: 'Users searched', data: users}))
    } else {
        Product.findAll({ order: ['firstName'] })
    .then(users => res.json({message: 'All Users', data: users}))
    .catch(error => res.status(500).json({ message: 'users list couldn\'t be retrieved, please retry later', error}))
    }
}

const createUser = (req, res) => {
    // check if required fields are filled
    // check if user is not duplicated (email)
    // if everything's good, crypt the password and create a new user object

    bcrypt.hash(req.body.password,10).then(hash => {
        req.body.password = hash
        User.create(req.body)
        .then(user => res.json({ message: 'the user has been created', data: user}))
    })
    .catch(error => {
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        res.status(500).json({ message: 'We couldn\'t create the user, please try later', error })
    })
}

module.exports = { getUsers, createUser }