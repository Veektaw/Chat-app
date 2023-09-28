const express = require('express')
const router = express.Router()

const {createMessage, getMessages} = require('../controllers/message-control')


router.route('/create-chat').post(createMessage)

router.route('/:chatId').get(getMessages)

module.exports = router