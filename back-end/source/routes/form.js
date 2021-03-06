const express = require('express')
const Form = require('../controllers/form.js')

const router = express.Router()

router.get('/', Form.all)
router.post('/create', Form.create)
router.get('/:id', Form.get)
router.put('/:id', Form.update)
router.delete('/delete', Form.remove)
router.post('/submit', Form.submit)
router.get('/answers/:form', Form.answers)
router.get('/share/:form', Form.share)
router.get('/filter/:userid', Form.filter)

module.exports = {
	routes: router
}
