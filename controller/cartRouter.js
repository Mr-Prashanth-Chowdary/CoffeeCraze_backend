const  axios  = require('axios')
const baseURL = require('../utils/config')

const cartRoute = require('express').Router()

cartRoute.get('/',async(request,response)=>{
    if(!request.token){
        return response.status(401).send('unauthorized without token')
    }
    try{
        const userDataRes = await axios.get(`${baseURL}/user/${request.id}`)
        return response.status(200).json({data:userDataRes.data.cart})
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
        const cartData = request.body
        const userDataRes = await axios.get(`${baseURL}/user/${request.id}`)
        const updateCart = [...userDataRes.data.cart,cartData]
        const patchRes = await axios.patch(`${baseURL}/user/${request.id}`,{cart:updateCart})
        return response.status(201).json({msg:'item added to cart',data:patchRes.data})
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
        const userData = await axios.get(`${baseURL}/user/${request.id}`)
        const cartData = userData.data.cart.filter((itm)=>itm.id.toString() !== id)
        const deleteRes = await axios.patch(`${baseURL}/user/${request.id}`,{cart:cartData})
        return response.status(200).json({msg:'item deleted',data:deleteRes.data})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal serverl error'})
    }
})


module.exports = cartRoute