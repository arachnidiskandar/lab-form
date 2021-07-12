const express = require('express')
const { createForm, getForm, getAllForms, updateForm, deleteForm } = require('../controllers/form.js')

const router = express.Router()

router.post('/forms/create', createForm)
router.get('/forms/:id', getForm)
router.get('/forms', getAllForms)
router.put('/forms/:id', updateForm)
router.delete('/forms/delete', deleteForm)

module.exports = {
	routes: router
}
