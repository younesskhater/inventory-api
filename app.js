const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors');
const corsOptions = require('./corsConfig.js')

const app = express()
const port = process.env.PORT || 3000

// if (process.env.NODE_ENV !== 'production') {
//    require('dotenv').config()
//  }

// const domainsFromEnv = process.env.CORS_DOMAINS || ""
// const whitelist = domainsFromEnv.split(',');

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }
app.use(cors(corsOptions))

app.use(favicon(__dirname + '/favicon.ico'))
   .use(bodyParser.json())

sequelize.initDb().then(_ => {
   app.listen( port, () => console.log(`notre application node est démarrée sur : ${process.env.HOST || port}`))
})

// login endpoint
require('./src/routes/authentication/login.js')(app)

// endpoints for products
require('./src/routes/find-products.js')(app)
require('./src/routes/find-product.js')(app)
require('./src/routes/create-product.js')(app)
require('./src/routes/update-product.js')(app)
require('./src/routes/delete-product.js')(app)

// user endpoints
require('./src/routes/user/create-user.js')(app)

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function (_, res) {
   res.sendFile(
      path.join(__dirname,  './client/build/index.html'),
      function(error) {
         res.status(500).json({ message: 'Launch front failed', error})
      }
   )
})

// app.get('/', (req, res) => {
//    res.send('deployment has been done successfully')
// })

app.use(({res}) => {
   res.status(404).json({ message: 'Impossible de trouver la ressource demandée ! Verifiez votre URL ou essayez une autre' })
})
