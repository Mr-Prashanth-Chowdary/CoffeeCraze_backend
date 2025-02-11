const express = require('express')
const userRoute = require('./controller/userRouter')
const authRoute = require('./controller/authRouter')
const cors = require('cors')
const app = express()
// const mongoURI
// mongo connection 
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
module.exports = app;