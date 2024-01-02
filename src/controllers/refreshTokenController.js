const { User, Role } = require('../db/sequelize')
const jwt = require('jsonwebtoken')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
 }

const accessPrvtKey = process.env.ACCESS_TOKEN_SECRET
const refreshPrvtKey = process.env.REFRESH_TOKEN_SECRET
const accessTokenExpTime = process.env.ACCESS_TOKEN_EXP_TIME

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) 
        return res.status(401).json({ message: 'couldn\'t refresh token ( no jwt cookie )' })
    
    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ 
        include: [{model: Role, as: 'roles', through: { attributes: [] }}],
        where: { refreshToken }
    })
    if(!foundUser) return res.status(403).json({message: 'couldn\'t refresh token ( no user identified )'})

    jwt.verify(
        refreshToken,
        refreshPrvtKey,
        (error, decoded) => {
            if (error || foundUser.email !== decoded.email) 
                return res.status(403).json({message: 'couldn\'t refresh token', error})
            
            const roles = foundUser.toJSON().roles.map(role => role.code)
            const accessToken = jwt.sign(
                { email: decoded.email, roles },
                accessPrvtKey,
                { expiresIn: accessTokenExpTime}
            )
            res.status(200).json({message: 'Access token refreshed', accessToken})
        }
    )
}

module.exports = { handleRefreshToken }