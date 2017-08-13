var connect = require('../bootstrapers/serverConnect')
var settings = require('../settings')
var buildUrl = require('build-url')
var https = require('https')

const METHOD = 'messages.get'
const OFFSET = 5
const COUNT = 20
const TIME_OFFSET = 0
const FILTERS = 0
const PREVIEW_LENGTH = 0

function messagesGet() {
    let url = buildUrl(settings.VK_API_URL, {
        path: METHOD,
        queryParams: {
            offset: OFFSET,
            count: COUNT,
            time_offset: TIME_OFFSET,
            filters: FILTERS,
            preview_length: PREVIEW_LENGTH,
            access_token: settings.ACCESS_TOKEN
        }
    })

    https.get(url, (res) => {
            let rawData = ''
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                try {
                    let json = JSON.parse(rawData)
                    console.log(json)
                } catch (e) {
                    console.error(e.message)
                }
            })
    })
} 

module.exports = messagesGet