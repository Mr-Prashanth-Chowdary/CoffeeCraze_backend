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
const path = require('path');
const config = require('./utils/config')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const productRoute = require('./controller/product')
const session = require('express-session');
const adminRoute = require('./controller/admin')
const morgan = require('morgan');
const passport = require('./services/Oauth/googleOauth')
require('dotenv').config()

// const mongoURI
mongoose.set('strictQuery',false)

// mongo connection 
mongoose.connect(config.MONGODB_URI).then(()=>{
    console.log('connected to db')
}).catch((error)=>{
    console.log('connection error',error)
})

//passport 
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.session());
app.use(passport.initialize());


app.use(cors({origin: ['http://localhost:5173', 'https://coffeecraze-backend.onrender.com'],credentials: true    }))
app.use(express.json())
app.use(fileUpload());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'dist')));


app.use('/api/auth',authRoute)
app.use('/api/products',productRoute)
app.use(jwtExtraction)
// app.use(userExtractor) -> moved to required routes
app.use('/api/user',userDataRoute)
app.use('/api/admin',adminRoute)
app.use('/api/cart',cartRoute)
app.use('/api/pay',payment)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

module.exports = app;
