const express = require('express')
const router = express.Router()

const {home, chatPage, findUser, findAllUsers} = require('../controllers/othercontrols')

router.route('/').get(home)

router.route('/chat-page').get(chatPage)

router.route('/find/users').get(findAllUsers)

router.route('/find/:userId').get(findUser)


module.exports = router
