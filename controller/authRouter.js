const auth = require('express').Router()
const axios  = require('axios');
const baseURL = require('../utils/config')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


auth.post('/login',async(request,response)=>{
    const {username,password} = request.body;
    if(!username){
        return response.status(401).json({errorMsg:'username required'})
    }
    if(!password){
        return response.status(401).json({errorMsg:'password required'})
    }

    try{
    const userData = await axios.get(`${baseURL}/user`)
    const user = userData.data.find((user)=>user.profile.name === username)
    // password check
    if(!(await bcrypt.compare(password,user.auth.passwordHash))){
        return response.status(401).json({msg:'password invalid'});
    }

    // jsonwebtoken genration 
    const key = process.env.JWT_SECRET
    const payload = {id:user.id, username:user.profile.name}
    const token = jwt.sign(payload,key,{expiresIn: '1h'})

    return response.status(200).json({token:token,username:user.profile.name})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server error'})
    }
})

auth.post('/signup',async(request,response)=>{
    const {emailid,password,username} = request.body

    // encrypt password 
    const saltRounds = 9;
    const hashpass = await bcrypt.hash(password,saltRounds)

    const newUser = {
        "id":Math.random().toString(),
        "profile":{
            "avatar":'👤',
            "name":username,
            "email":emailid,
            "phone":null,
            "role":"customer",
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        },
        "auth":{
            "passwordHash":hashpass,
            "lastLogin":null,
            "isLocked":false
        },
        "orders":[],
        "cart":[],
        "address":[]
    }

    try{
        const addUserRes = await axios.post(`${baseURL}/user`,newUser)
        return response.status(201).json({msg:'user created',data:addUserRes.data})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server at signup'})
    }
})




module.exports = auth