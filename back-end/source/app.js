const express = require('express')
const config = require('./config/config.js')
const form = require('./routes/form.js')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    res.status(200).json({});
  }
  next();
});

app.use('/api/forms', form.routes)


app.listen(config.port, () => {
	console.log(`Running at http://localhost:${config.port}`)
})
