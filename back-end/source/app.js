const express = require('express')
const config = require('./config/config.js')
const form = require('./routes/form.js')

const app = express()

app.use(express.json());

app.use('/api', form.routes)

app.listen(config.port, () => {
	console.log(`Running at http://localhost:${config.port}`)
})
