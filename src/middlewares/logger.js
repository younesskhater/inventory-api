const { format } = require('date-fns')
const path = require('path')

const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${message}\n`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    // logEvents(`${req.method}\t${req.header.origin}\t${req.url}`, 'reqlog.txt')
    console.log(`${req.method}\t${req.header.origin}\t${req.url}`)
    next()
}

// how to use the logger with an event emitter
/*
const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new EventEmitter()

myEmitter.on('log', (msgToLog) => {
    logEvents(msgToLog)
})

setTimeout(() => {
    myEmitter.emit('log', 'this is a message for the log')
}, 2000)
*/


module.exports = { logEvents, logger }

