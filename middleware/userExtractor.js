const jwt = require('jsonwebtoken')
require('dotenv').config()

const key = process.env.JWT_SECRET
const userExtractor = (request,response,next)=>{
    try{
        const user = jwt.verify(request.token,key)
        request.id = user.id
        request.username = user.username
    }catch(e){
        console.error(e)
        response.json('jwt token expired')
    }
    next()
}

module.exports = userExtractor