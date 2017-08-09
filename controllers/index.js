router = require('../app.js').router
settings = require('../settings')

router.all('/', function (req, res) {
  res.send(settings.VERIFICATION_STRING)
})
