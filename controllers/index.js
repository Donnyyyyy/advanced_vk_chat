app = require('../app.js').app

app.get('/', function (req, res) {
  res.json({
    'text': 'helloworld!'
  })
})
