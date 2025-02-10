const express = require('express')
const userRoute = require('./userRouter')
const cors = require('cors')
const app = express()
// const mongoURI
// mongo connection 
app.use(express.json())
app.use('/api/user',userRoute)
module.exports = app;