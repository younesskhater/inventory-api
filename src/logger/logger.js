const { format } = require('date-fns')

const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
}

exports.logEvent