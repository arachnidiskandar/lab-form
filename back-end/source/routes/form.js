const express = require('express')
const { createForm, deleteForm } = require('../controllers/form.js')

const router = express.Router()

router.post('/forms/create', createForm)
router.delete('/forms/delete', deleteForm)

module.exports = {
	routes: router
}
