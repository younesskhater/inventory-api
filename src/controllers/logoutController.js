const { User } = require('../db/sequelize')
const jwt = require('jsonwebtoken')


const clearJwtCookie = (res) => {
    // secure: true - only serves on https - add it in production
    // we don't need to put maxAge again to clear the cookie
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' })
}

const logout = async (req, res) => {
    const cookies = req.cookies
    // No content
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ where: { refreshToken }})

    if(!foundUser) {
        clearJwtCookie(res)
        return res.sendStatus(204)
    } 

    clearJwtCookie(res)
    User.update({ refreshToken: null }, { where: { email: foundUser.email }}).then(_ => {
        res.sendStatus(204)
    })
    
}

module.exports = { logout }