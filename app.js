require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const line = require('@line/bot-sdk')
const lineConfig = require('./configs/line')

const lineController = require('./controllers/line')

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/crypto_line_bot', {
  useMongoClient: true
});
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.set('port', process.env.PORT || 5000)
app.use(morgan(':remote-addr - [:date[iso]] :method :url :status :response-time ms'))

app.post('/webhook', line.middleware(lineConfig.sdkConfig), lineController.webhook)

app.listen(app.get('port'), () => {
  console.log('Application is listening on port:', app.get('port'))
})
