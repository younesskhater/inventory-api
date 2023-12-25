const express = require('express')
const router = express.Router()
const { login } = require("../../controllers/authentController")

router.post('/', login)

module.exports = router

// curl --header "Content-Type: application/json" --request POST --data '{"email":"you@gmail.com","password":"123"}' http://localhost:3000/api/login
