const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const verifyRoles = require('../../middlewares/verifyRoles')
const ROLES_LIST = require('../../config/rolesList')

router.route('/')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.InventoryManager), usersController.getUsers)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.InventoryManager), usersController.createUser)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.InventoryManager))
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.InventoryManager))

router.route('/:id')
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.InventoryManager))

module.exports = router