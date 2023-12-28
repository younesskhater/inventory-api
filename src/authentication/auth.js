const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const accessPrvtKey = process.env.ACCESS_TOKEN_SECRET

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization || req.headers.Authorization // Bearer token

    if (!authorizationHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'You are not authorized to access the API' })
    }

    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, accessPrvtKey, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ message: 'You are not authorized to access the API', error })
        }

        req.email = decodedToken.email
        req.roles = decodedToken.roles
        next()
    })
}