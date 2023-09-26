const asyncWrapper = require('../middleware/async')
const User = require('../models/user')
const validator = require('validator')
const bcrypt = require('bcrypt')
const createToken = require('../helpers/token')


const signup = asyncWrapper(async (req, res) => {
    try {
        const {name, email, password} = req.body;

        let user = await User.findOne({email});

        if(user) return res.status(400).json({message: "User with email exists"});

        if(!name || !email || !password) return res.status(400).json({message: "Fields are empty"})

        if(!validator.isEmail(email)) return res.status(400).json({message: "Email must be valid"})

        if(!validator.isStrongPassword(password)) return res.status(400).json({message: "Password must have 8 alphabets, a capital letter, a number and a special character"})

        user = new User({name, email, password})

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, salt)

        user.save()

        const token = createToken(user._id);

        res.status(201).json({message: "User created", _id: user._id, name, email, token})

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
});

const login = asyncWrapper(async (req, res) => {
   try {
     const {email, password} = req.body;

     let user = await User.findOne({email});

    if (!user) return res.status(400).json({message: "Invalid email or password"})

    const isValidPassword = await bcrypt.compare(password, user.password)

    if(!isValidPassword) return res.status(400).json({message: "Invalid email or password"})

    const token = createToken(user._id);

    res.status(200).json({message: "User logged in", _id: user._id, name: user.name, email, token})

   } catch (error) {
        console.log(error)
        res.status(500).json(error)
   }
});

module.exports = {signup, login};