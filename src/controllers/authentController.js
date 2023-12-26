const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
 }

const accessPrvtKey = process.env.ACCESS_TOKEN_SECRET
const refreshPrvtKey = process.env.ACCESS_TOKEN_SECRET
const oneDayInMiliseconds = 24 * 60 * 60 * 1000

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
                    const accessToken = jwt.sign(
                        { email: user.email },
                        accessPrvtKey,
                        { expiresIn: '1h'}
                    )
                    const refreshToken = jwt.sign(
                        { email: user.email },
                        refreshPrvtKey,
                        { expiresIn: '2d'}
                    )
                    const { password, ...userData } = user.toJSON();

                    // saving refreshToken to database to use it when the user disconnect
                    User.update({ refreshToken }, { where: { email: userData.email }})
                    res.cookie('jwt', refreshToken, { 
                        httpOnly: true, 
                        sameSite: 'None',
                        maxAge: oneDayInMiliseconds // search for the difference between maxeAge and expiration
                        // secure: true
                    })
                    return res.status(200).json({ message: 'authenticated successufully', userData,  accessToken })
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