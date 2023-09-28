const asyncWrapper = require('../middleware/async')
const User = require('../models/user')

const home = asyncWrapper(async (req, res) => {
  res.send("Welcome to my place")
});

const chatPage = asyncWrapper(async (req, res) => {
    res.send("This is the chat page")
})

const findUser = asyncWrapper(async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await User.findById(userId)

        res.status(200).json({message: "User found", name: user.name, email: user.email})

    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
})


const findAllUsers = asyncWrapper(async (req, res) => {
  try {
    // Find all users and store them in an array
    const users = await User.find();

    // Extract the name and email properties from each user document
    const userDetails = users.map(user => ({ name: user.name, email: user.email }));

    res.status(200).json({ message: "Users found", users: userDetails });

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = {home, chatPage, findUser, findAllUsers};