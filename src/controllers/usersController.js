const { User, Role } = require('../db/sequelize')
const { Op, UniqueConstraintError, ValidationError } = require('sequelize')
const bcrypt = require('bcrypt')

const getUsers = (req, res) => {
    if (req.query.searchText || req.query.limit) {
        const searchText = req.query.searchText
        User.findAndCountAll({
            where: { 
                [Op.or]: [
                    {
                        lastName: {
                            // The %signs are wildcard characters that match any sequence of characters before and after the searchText
                            [Op.like]: `%${searchText}%`,
                        },
                    },
                    { firstName: { [Op.like]: `%${searchText}%` }},
                    { email: { [Op.like]: `%${searchText}%` }}
                ]
            },
            order: ['lastName'],
            limit: parseInt(req.query.limit) || 100,
            skip: parseInt(req.query.skip) || 0,
        })
        .then(users => res.json({ message: 'Users searched', data: users}))
    } else {
        User.findAll({ order: ['lastName'] })
    .then(users => res.json({message: 'All Users', data: users}))
    .catch(error => res.status(500).json({ message: 'users list couldn\'t be retrieved, please retry later', error}))
    }
}

const createUser = async (req, res) => {

    if (!req.roles.includes('ADMIN')) {
        return res.status(403).json({ message: 'You don\'t have the permission'})
    }
    // check if required fields are filled
    // check if user is not duplicated (email)
    // if everything's good, crypt the password and create a new user object
    try {
        req.body.password = await bcrypt.hash(req.body.password,10)
        const { roles, ...userWithoutRoles } = req.body

        const newUser = await User.create(userWithoutRoles)
        let { password, ...createdUser } = newUser.toJSON()
        if (roles?.length) {
            userRoles = await Role.findAll({ where: { code: roles}})
            await newUser.addRoles(userRoles)
            createdUser = await User.findByPk(newUser.id, { include: [{model: Role, as: 'roles', through: { attributes: [] }}]})
            createdUser.password = undefined
        }

    res.status(200).json({ message: 'the user has been created', data: createdUser})
    }
    catch(error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        console.log(error)
        res.status(500).json({ message: 'We couldn\'t create the user, please try later', error })
    }
}

const updateUser = (req, res) => {
    const id = req.params.id;
    User.update(req.body, { 
        where: { id }
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
            if(error.errors.some(error => error.type === 'unique violation' && error.path === 'user_email')) {
                return res.status(422).json({ message : 'the email of a User should be unique', error })
            }
        }
        if (error instanceof ValidationError) {
            return res.status(400).json({message: error.message, error})
        }
        res.status(500).json({ message: 'We couldn\'t update the User, please try later', error })
    })
}

module.exports = { getUsers, createUser, updateUser }