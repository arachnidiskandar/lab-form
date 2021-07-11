const express = require('express')

const router = express.Router()

router.get('/forms', (req, res) => {
	res.send('::get forms::')
})

module.exports = {
	routes: router
}
