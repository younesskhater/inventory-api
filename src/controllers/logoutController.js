const { User } = require('../db/sequelize')

const logout = async (req, res) => {

    const cookies = req.cookies

    // No content
    if (!cookies?.jwt) 
        return res.sendStatus(204)

    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({ where: { refreshToken }})

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    if(!foundUser) {
        return res.sendStatus(204)
    }
    User.update({ refreshToken: null }, { where: { email: foundUser.email } }).then(_ => {
        res.sendStatus(204)
    })
    
}

module.exports = { logout }