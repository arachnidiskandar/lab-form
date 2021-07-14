const express = require('express')
const config = require('./config/config.js')
const form = require('./routes/form.js')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/forms', form.routes)


app.listen(config.port, () => {
	console.log(`Running at http://localhost:${config.port}`)
})
