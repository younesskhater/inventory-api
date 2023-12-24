const { logEvents } = require('./logger')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'erroLog.txt')
    console.log(err.stack)
    // res.status(500).send(err)
    next()
}

module.exports = errorHandler