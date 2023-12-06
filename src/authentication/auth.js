const jwt = require('jsonwebtoken')
const pivateKey = require('./private-key')
const privateKey = require('./private-key')

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'You are not authorized to access the API' })
    }


    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
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