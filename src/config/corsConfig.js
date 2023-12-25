
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

  const domainsFromEnv = process.env.CORS_DOMAINS || ""
     const whitelist = domainsFromEnv.split(',');

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    optionsSuccessStatus: 200,
    credentials: true
  }

module.exports = corsOptions