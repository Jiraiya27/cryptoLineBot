const line = require('@line/bot-sdk')
const lineConfig = require('../configs/line')

const client = new line.Client(lineConfig.sdkConfig)

const webhook = (req, res) => {
  Promise
  .all(req.body.events.map(handleEvent))
  .then((result) => res.json(result));
}

const handleEvent = (event) => {
  if (event.type !== 'message' || event.type !== 'text') {
    console.log('Received unhandled event:', event.type)
    return Promise.resolve(null)
  }

  const regexResult = event.message.text.match(/^(\/lol)|^(\/lel)|(.*)/g)
  console.log(regexResult)
  
}

module.exports = {
  webhook
}