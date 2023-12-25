const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
 }

const privateKey = process.env.ACCESS_TOKEN_SECRET

const login = (req, res) => {
    User.findOne({ where: 
        { email: req.body.email }
    }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password)
                .then(isPasswordValid => {
                    if(!isPasswordValid) {
                        return res.status(401).json({ message: 'the combination email or password is incorrect' })
                    }

                    // JWT
                    // use process env for expiresIn value
                    const token = jwt.sign(
                        {userId: user.id},
                        privateKey,
                        { expiresIn: '24h'}
                    )
                    const { password, ...userData } = user.toJSON();
                    return res.status(200).json({ message: 'authenticated successufully', userData,  token })
                })
                .catch(error => {
                    return res.status(500).json({message: 'We coundn\'t authenticate you, please try later', error })
                })
        } else {
            return res.status(401).json({ message:'the combination email or password is incorrect' })
        }
    })
    .catch(error => {
        return res.status(500).json({message: 'We coundn\'t authenticate you, please try later', error })
    })
}

module.exports = { login }