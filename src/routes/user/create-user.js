const { ValidationError } = require("sequelize")
const { User } = require("../../db/sequelize")
const bcrypt = require("bcrypt")
const auth = require("../../authentication/auth")

module.exports = (app) => {
    app.post('/api/users', auth, (req, res) => {
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
    })
}