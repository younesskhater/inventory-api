const { User } = require('../db/sequelize')
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
 }

const accessPrvtKey = process.env.ACCESS_TOKEN_SECRET
const refreshPrvtKey = process.env.ACCESS_TOKEN_SECRET

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ message: 'couldn\'t refresh token' })
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ where: { refreshToken }})
    if(!foundUser) return res.status(403).json({message: ''})

    jwt.verify(
        refreshToken,
        refreshPrvtKey,
        (error, decoded) => {
            if (error || foundUser.email !== decoded.email) return res.status(403).json({message: 'couldn\'t refresh token'})
            // check if the refresh token has exparied before sending a new access token
            const accessToken = jwt.sign(
                { email: decoded.email },
                accessPrvtKey,
                { expiresIn: '1h'}
            )
            res.status(200).json({message: 'Access token refreshed', accessToken})
        }
    )
}

module.exports = { handleRefreshToken }