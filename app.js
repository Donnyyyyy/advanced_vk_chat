var express = require('express')
var bodyParser = require('body-parser')
var filesystem = require('fs');

var settings = require('./settings')


function bootstrap() {
    let app = express()
    setupControllers(settings.CONTROLLERS_FOLDER)

    app.set('views', './views')
    app.set('view engine', 'pug')

    app.use(bodyParser.json())       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }))

    let server = app.listen(settings.PORT, () => {
        console.log(`Running at ${server.address().address}:${server.address().port}`)
    })
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