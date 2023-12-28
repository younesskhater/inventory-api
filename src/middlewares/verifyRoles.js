const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        
        if (!req?.roles) return res.status(401).json({ message: 'You don\'t have permission'})

        console.log(allowedRoles, req.roles)
        const hasAllowedRole = req.roles.map(role => allowedRoles.includes(role)).find(bool => bool === true)

        if (!hasAllowedRole) return res.status(401).json({ message: 'You don\'t have permission'})

        next()
    }
}

module.exports = verifyRoles