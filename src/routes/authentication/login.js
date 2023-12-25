const { login } = require("../../controllers/authentController")


module.exports = (app) => {
    app.post('/api/login', login)
}

// curl --header "Content-Type: application/json" --request POST --data '{"email":"you@gmail.com","password":"123"}' http://localhost:3000/api/login
