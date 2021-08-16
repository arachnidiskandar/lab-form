const express = require('express')
const User = require('../controllers/user.js')

const router = express.Router()

router.post('/create', User.create)
router.post('/login', User.login)
router.post('/signout', User.signout)

module.exports = {
	routes: router
}
