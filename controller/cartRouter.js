const  axios  = require('axios')
const baseURL = require('../utils/config')
const User = require('../model/userModel')

const cartRoute = require('express').Router()

cartRoute.get('/',async(request,response)=>{
    if(!request.token){
        return response.status(401).send('unauthorized without token')
    }
    try{
        // get cart data
        const cartData = await User.findById(request.id,"cart")
        return response.status(200).json({data:cartData.data})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server error'})
    }
})

cartRoute.post('/',async(request,response)=>{
    if(!request.token){
        return response.status(401).send('unauthorized without token')
    }
    try{
        const cart = request.body
        const cartData = [...cart]
        const updateCart = await User.findByIdAndUpdate(request.id,
            {$set:{cart : cartData}},
            {new:true, projection:{cart:1}}
        )
        return response.status(201).json({msg:'item added to cart',data:updateCart})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server error'})
    }
})

cartRoute.delete('/',async(request,response)=>{
    if(!request.token){
        return response.status(401).send('unauthorized without token')
    }
    try{
        const {id} = request.body
        if (!id) {
            return response.status(400).json({ msg: 'Product ID missing in request' });
        }

        //remove the product from the cart using MongoDB's $pull
        const updateCart = await User.findByIdAndUpdate(request.id,
            {$pull:{cart:{id:id}}},
            {new:true,projection:{cart:1}}
        )
        return response.status(200).json({msg:'item deleted',data:updateCart})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal serverl error'})
    }
})

module.exports = cartRoute