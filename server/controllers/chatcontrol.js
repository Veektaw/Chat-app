const asyncWrapper = require('../middleware/async')
const Chat = require('../models/chatModel')

const chatPage = asyncWrapper(async (req, res) => {
    try {
        const [firstId, secondId] = req.body
        const chat = await Chat.findOne({
            members: {$all: [firstId, secondId]}
        })
        if (chat) return res.status(200).json(chat);

        const newChat = new Chat({
            members: [firstId, secondId]
        });

        const response = await newChat.save()

        res.status(200).json(response)

    } catch (error) {
        res.status(500).json(error)
    }
    
})


const Findchat = asyncWrapper(async (req, res) => {
    try {
        const userId = req.params.userId

        const chats = Chat.find({
            members: {$in: [userId]}
        })

        res.status(200).json(chats)
    } catch (error) {
        res.status(500).json(error)
    }

})