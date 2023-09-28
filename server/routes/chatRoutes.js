const express = require('express')
const router = express.Router()

const {createChatPage, findchat, findAllUserChats} = require('../controllers/chat-control')

router.route('/').post(createChatPage)

router.route('/:userId').get(findchat)

router.route('/:firstId/:secondId').get(findAllUserChats)


module.exports = router