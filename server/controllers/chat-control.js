const asyncWrapper = require('../middleware/async')
const Chat = require('../models/chatModel')

const createChatPage = asyncWrapper(async (req, res) => {
    const {firstId, secondId} = req.body
    try {
        
        const chat = await Chat.findOne({
            members: [firstId, secondId]
        })
        if (chat) return res.status(200).json(chat);

        const newChat = new Chat({
            members: [firstId, secondId]
        });

        const response = await newChat.save()

        res.status(200).json(response)

    } catch (error) {
        console.error(error); 
        res.status(500).json(error);
    }
    
});


const findchat = asyncWrapper(async (req, res) => {
    try {
        const userId = req.params.userId;

        const chats = await Chat.find({
            members: {$in: [userId]} 
        });

        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});



const findAllUserChats = asyncWrapper(async (req, res) => {
    try {
        const {firstId, secondId} = req.params;

        const chat = await Chat.find({
            members: {$all: [firstId, secondId]}
        })

        res.status(200).json(chat)
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }

});



module.exports = {createChatPage, findchat, findAllUserChats};