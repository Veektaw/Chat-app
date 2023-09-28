const express = require('express')
const router = express.Router()

const {home, chatPage, findUser, findAllUsers} = require('../controllers/other-controls')

router.route('/').get(home)

router.route('/chat-page').get(chatPage)

router.route('/users').get(findAllUsers)

router.route('/:userId').get(findUser)


module.exports = router
