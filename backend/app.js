const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config()

const authRouter = require('./routes/auth');
const subscriptionsRouter = require('./routes/subscriptions');
const cinemaRouter = require('./routes/cinema');
const { verifyToken } = require('./utils/authUtils');

const db = require('./config/database');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRouter)
app.use('/cinema', cinemaRouter)
// app.use('/cinema', verifyToken, cinemaRouter)
app.use('/sub', subscriptionsRouter)

app.listen(process.env.PORT || 5000, () => console.log("Connected"));