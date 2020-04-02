const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const chatRoutes = require('./routes/chat');
const roomRoutes = require('./routes/room');
const userRoutes = require('./routes/users');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log("MongoDB Connected..."))
            .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.intialize());
require('./config/passport')(passport);

app.use('/chat', chatRoutes);
app.use('/room', roomRoutes);
app.use('/users', userRoutes);

const port = process.env.PORT || 3040;
app.listen(port, console.log(`Server running on port ${port}`));