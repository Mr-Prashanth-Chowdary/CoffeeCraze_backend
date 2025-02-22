const  userDataRoute = require('express').Router()
const User = require('../model/userModel')
const baseURL = require('../utils/config')
const bcrypt = require('bcrypt')
const userExtractor = require('../middleware/userExtractor')

userDataRoute.get('/orders',userExtractor,async(req,res)=>{
    if(!req.id){
        return res.status(401).json({error:'unauthorized:: token invalid or not found'})
    }
    try{
        const userCartData = await User.findById(req.id,{orders:1,address:1})
        return res.status(200).json({data:userCartData})
    }catch(e){
        console.log(e)
        res.status(500).json({error:'internal server error while feaching order'})
    }
})

module.exports = userDataRoute