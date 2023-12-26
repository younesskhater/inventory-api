if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const whitelist = (process.env.CORS_DOMAINS || "").split(',');

const credentials = (req, res, next) => {
    const origin = req.headers.origin
    if (whitelist.indexOf(origin) !== -1) {
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials