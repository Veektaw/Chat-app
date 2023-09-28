const asyncWrapper = require('../middleware/async')
const Message = require('../models/messageModel')

const createMessage = asyncWrapper(async (req, res) => {

    try {
        const {chatId, senderId, text} = req.body;

        const message = new Message({
            chatId, senderId, text
        })

        message.save();

        res.status(201).json({response: "Message sent", message});

    } catch (error) {
        console.error(error); 
        res.status(500).json(error);
    }
})

const getMessages = asyncWrapper(async(req, res) => {

    try {
        const {chatId} = req.params;

        const messages = await Message.find({chatId});

        res.status(200).json(messages);

    } catch (error) {
        console.error(error); 
        res.status(500).json(error);
    }
})

module.exports = {createMessage, getMessages};