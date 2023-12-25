const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const cors = require('cors');
const corsOptions = require('./src/config/corsConfig.js')

const app = express()
const port = process.env.PORT || 3200

app.use(cors(corsOptions))

app.use(favicon(__dirname + '/favicon.ico'))
   .use(bodyParser.json())

console.log('trying to connect to db .......')
sequelize.initDb().then(_ => {
   app.listen( port, () => console.log(`notre application node est démarrée sur : ${process.env.HOST || port}`))
}).catch(_ => {
   console.log('could not connect to database please try again')
   process.exit(1)
})

app.use('/api/login', require('./src/routes/authentication/login.js'))
app.use('/api/products', require('./src/routes/products/products.js'))
// user endpoints
require('./src/routes/users/create-user.js')(app)

app.use(express.static(path.join(__dirname, 'client', 'build')))

// serve up the index.html if express does'nt recognize the route
// app.get('*', function (_, res) {
//    res.sendFile(
//       path.join(__dirname,  './client/build/index.html'),
//       function(error) {
//          return res.status(500).json({ message: 'Launch front failed', error})
//       }
//    )
// })

// app.get('/', (req, res) => {
//    res.send('deployment has been done successfully')
// })

app.use(({res}) => {
   res.status(404).json({ message: 'Impossible de trouver la ressource demandée ! Verifiez votre URL ou essayez une autre' })
   return;
})
