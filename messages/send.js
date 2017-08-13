var connect = require('../bootstrapers/serverConnect')
var settings = require('../settings')
var buildUrl = require('build-url')
var https = require('https')

const METHOD = 'messages.send'
const OFFSET = 5
const COUNT = 20
const TIME_OFFSET = 0
const FILTERS = 0
const PREVIEW_LENGTH = 0

function messageSendOne(id, msg) {
    let url = buildUrl(settings.VK_API_URL, {
        path: METHOD,
        queryParams: {
            user_id: id,
            message: msg,
            access_token: settings.ACCESS_TOKEN
        }
    })

    https.get(url, (res) => {
            if (res.statusCode === 200)
                console.log('Message sent to ' + id)
            else
                console.log('Error sending message')
            let rawData = ''
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                try {
                    let json = JSON.parse(rawData)
                } catch (e) {
                    console.error(e.message)
                }
            })
    })
} 

module.exports = messageSendOne