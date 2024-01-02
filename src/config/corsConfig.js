
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const whitelist = (process.env.CORS_DOMAINS || "").split(',');

  const corsOptions = {
    origin: function (origin, callback) {
      
      if (!origin || whitelist.indexOf(origin) !== -1 || origin.startsWith('http://localhost:')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
    
  }

module.exports = corsOptions