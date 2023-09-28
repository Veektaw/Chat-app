const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const otherRoutes = require('./routes/otherRoutes');
const errorHandler = require('./errors/handler')
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes')
require('./helpers/db.init');


app.use(express.json());
app.use(cors());

app.use('/api/chat', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/user', authRoutes)
app.use('/api/find', otherRoutes);


// app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`)
})