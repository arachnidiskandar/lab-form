const express = require('express')
const { createForm, deleteForm } = require('../controllers/form.js')

const router = express.Router()

router.get('/forms/create', createForm)
router.get('/forms/delete', deleteForm)

module.exports = {
	routes: router
}
