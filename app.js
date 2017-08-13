var express = require('express')
var bodyParser = require('body-parser')
var filesystem = require('fs');
var connect = require('./bootstrapers/serverConnect')
var settings = require('./settings')
var messagesGet = require('./messages/get')
var messageSend = require('./messages/send')
var updateHandler = require('./update_handlers/longPollHandler')

const DIMAS_ID = 233650480

function bootstrap() {
    let app = express()

    app.set('views', './views')
    app.set('view engine', 'pug')

    app.use(bodyParser.json())       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }))

    let server = app.listen(settings.PORT, () => {
        console.log(`Running at ${server.address().address}:${server.address().port}`)
    })

    connect(updateHandler)

    return app
}

function setupControllers(controllersFolder) {
    filesystem.readdir(controllersFolder, (err, files) => {
        files.forEach(file => {
            if (file.includes('.js')) {
                require(controllersFolder + file.substring(0, file.length - 3))
            }
        })
    })
}

var app = bootstrap()
var appRouter = express.Router()
app.use('/vk-chat', appRouter);

module.exports = {
    app: app,
    router: appRouter
}

setupControllers(settings.CONTROLLERS_FOLDER)
