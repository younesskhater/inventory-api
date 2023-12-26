const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.createUser)
    .put()
    .delete()

router.route('/:id')
    .get()