var sendMessage = require('../messages/send')


const CODE_HANDLERS = {
    61: (update) => handleTypingStarted(update[1])
}

function handleUpdate(updates) {
    console.log(updates)

    updates.forEach((update) => {
        let updateCode = update[0]
        handler = CODE_HANDLERS[updateCode]
        if (handler !== undefined) handler(update)
    })
}

function handleTypingStarted(uid) {
    sendMessage(uid, 'Ti pidor)))')
}


module.exports = handleUpdate
