var https = require('https')
var querystring = require('querystring')
var settings = require('../settings')
var querystringModule = require('querystring')
var buildUrl = require('build-url')


const METHOD = 'messages.getLongPollServer'
const NEED_PTS = 1
const ACCESS_TOKEN = settings.ACCESS_TOKEN

function getLongPollServer(callback) {
    let url = buildUrl(settings.VK_API_URL, {
        path: METHOD,
        queryParams: {
            need_pts: NEED_PTS,
            access_token: ACCESS_TOKEN,
        }
    })

    https.get(url, (res) => {
        let rawData = ''
        res.on('data', (chunk) => { rawData += chunk })
        res.on('end', () => {
            try {
                let json = JSON.parse(rawData).response
                callback(json)
            } catch (e) {
                console.error(e.message)
            }
        })
    })
}

module.exports = getLongPollServer
