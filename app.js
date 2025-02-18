const express = require('express')
const userDataRoute = require('./controller/userRouter')
const authRoute = require('./controller/authRouter')
const cors = require('cors')
const jwtExtraction = require('./middleware/jwtExtractor')
const cartRoute = require('./controller/cartRouter')
const userExtractor = require('./middleware/userExtractor')
const mongoose = require('mongoose')
const payment = require('./controller/Razorpay')
const app = express()
const config = require('./utils/config')
require('dotenv').config()

// const mongoURI
mongoose.set('strictQuery',false)

// mongo connection 
mongoose.connect(config.MONGODB_URI).then(()=>{
    console.log('connected to db')
}).catch((error)=>{
    console.log('connection error',error)
})

app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoute)
app.use(jwtExtraction)
app.use(userExtractor)
app.use('/api/user',userDataRoute)
app.use('/api/cart',cartRoute)
app.use('/api/pay',payment)
module.exports = app;