const express = require('express')
const router = express.Router()
const auth = require('../../authentication/auth.js')
const usersController = require('../../controllers/usersController')

router.route('/')
    .get(auth, usersController.getUsers)
    .post(auth, usersController.createUser)
    .put()
    .delete()

router.route('/:id')
    .get()