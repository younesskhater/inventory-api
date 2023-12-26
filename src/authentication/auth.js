const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

 const accessPrvtKey = process.env.ACCESS_TOKEN_SECRET
 const refreshPrvtKey = process.env.ACCESS_TOKEN_SECRET

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization // Bearer token

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'You are not authorized to access the API' })
    }

    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, accessPrvtKey, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ message: 'You are not authorized to access the API', error })
        }

        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            res.status(401).json({ message: 'You are not authorized to access the API', error })
        } else {
            next()
        }
    })
}