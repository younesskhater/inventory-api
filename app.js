const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = process.env.PORT || 3000

app.use(favicon(__dirname + '/favicon.ico'))
   .use(bodyParser.json())

sequelize.initDb()

app.get('/', (req, res) => {
   res.send('deployment has been done successfully')
})

// login endpoint
require('./src/routes/authentication/login.js')(app)

// endpoints for products
require('./src/routes/find-products.js')(app)
require('./src/routes/find-product.js')(app)
require('./src/routes/create-product.js')(app)
require('./src/routes/update-product.js')(app)
require('./src/routes/delete-product.js')(app)


require('./src/routes/user/create-user.js')(app)


app.use(({res}) => {
   res.status(404).json({ message: 'Impossible de trouver la ressource demandée ! Verifiez votre URL ou essayez une autre' })
})


app.listen( port, () => console.log(`notre application node est démarrée sur : localhost:${port}`))