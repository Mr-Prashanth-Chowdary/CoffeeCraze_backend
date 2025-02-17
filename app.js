const express = require('express')
const userRoute = require('./controller/userRouter')
const authRoute = require('./controller/authRouter')
const cors = require('cors')
const jwtExtraction = require('./middleware/jwtExtractor')
const cartRoute = require('./controller/cartRouter')
const userExtractor = require('./middleware/userExtractor')
const app = express()
// const mongoURI
// mongo connection 
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use(jwtExtraction)
app.use(userExtractor)
app.use('/api/cart',cartRoute)
module.exports = app;