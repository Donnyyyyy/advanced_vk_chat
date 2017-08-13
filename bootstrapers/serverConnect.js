var getLongPollServer = require('./longPollConnect')
var buildUrl = require('build-url')
var https = require('https')


const WAIT = 25
const MODE = 2
const VERSION = 2

function connect(updateHandler) {
    let requestFunction = (connectionData) => {

        let updateRequestParams = (responseData) => {
            connectionData.ts = responseData.ts
        }

        let url = buildUrl('https://' + connectionData.server, {
            queryParams: {
                act: 'a_check',
                key: connectionData.key,
                ts: connectionData.ts,
                wait: WAIT,
                version: VERSION,
                mode: MODE,
            }
        })

        https.get(url, (res) => {
            let rawData = ''
            res.on('data', (chunk) => { rawData += chunk })
            res.on('end', () => {
                try {
                    let json = JSON.parse(rawData)
                    updateRequestParams(json)
                    updateHandler(json.updates)
                    requestFunction(connectionData)
                } catch (e) {
                    console.error(e.message)
                }
            })
        })
    }
    getLongPollServer(requestFunction)
}

module.exports = connect
