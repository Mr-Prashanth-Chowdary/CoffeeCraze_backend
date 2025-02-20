const auth = require('express').Router()
const axios  = require('axios');
const baseURL = require('../utils/config')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
require('dotenv').config()


auth.post('/login',async(request,response)=>{
    const {email,password} = request.body;
    if(!email){
        return response.status(401).json({errorMsg:'username required'})
    }
    if(!password){
        return response.status(401).json({errorMsg:'password required'})
    }

    try{
    // check user exist
    const userData = await User.findOne({"profile.email":email})
    if(!userData){
        return response.status(400).json({msg:'user not found'});
    }
    // password check
    if(!(await bcrypt.compare(password,userData.auth.passwordHash))){
        return response.status(401).json({msg:'password invalid'});
    }

    // jsonwebtoken genration 
    const key = process.env.JWT_SECRET
    const payload = {id:userData._id, username:userData.profile.name,role:userData.profile.role}
    const token = jwt.sign(payload,key,{expiresIn: '1h'})

    // update userdata lastlogin 
    const updataLastLogin = await User.updateOne({_id:userData._id},{$set:{"auth.lastLogin": new Date()}})

    // responed back to client
    return response.status(200).json({token:token,username:userData.profile.name})
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

    const newUser = new User({
        "profile":{
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
    })

    try{
        // const addUserRes = await axios.post(`${baseURL}/user`,newUser)
        const saveUser = await newUser.save()
        return response.status(201).json({msg:'user created',data:saveUser})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server at signup'})
    }
})
module.exports = auth