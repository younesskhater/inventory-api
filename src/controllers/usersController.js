const { User } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize')

const getUsers = (req, res) => {
    if (req.query.firstName) {
        const firstName = req.query.firstName
        User.findAndCountAll({ 
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
        User.findAll({ order: ['firstName'] })
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

const updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, { 
        where: { id: id }
        })
    .then(_ => {
        return User.findByPk(id)
            .then(user => {
                if (user === null) {
                    return res.status(404).json({ message: 'the User demanded doesn\'t exist, Please try with another Id' })
                }
                res.json({message: `User ${id} has been updated: `, data: user})
            })
    })
    .catch(error => {
        if (error instanceof UniqueConstraintError) {
            if(error.errors.some(error => error.type === 'unique violation' && error.path === 'products_name_category')) {
                return res.status(422).json({ message : 'the name of a User should be unique for the same category', error })
            }
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        res.status(500).json({ message: 'We couldn\'t update the User, please try later', error })
    })
}

module.exports = { getUsers, createUser, updateUser }