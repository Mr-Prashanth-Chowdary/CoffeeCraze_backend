const userRoute = require('express').Router()
const baseURL = require('../utils/config')
const axios = require('axios')
const bcrypt = require('bcrypt')


// remove this at required time
userRoute.get('/',async(request,respones)=>{
    try{
        const {data} =  await axios(`${baseURL}/user`)
        return respones.status(200).json(data)
    }catch(e){
        console.error(e)
    }
})

// adding user to db
userRoute.post('/',async(request,response)=>{
    const saltRound = 10
    
    const hashPass = await bcrypt.hash(request.body.auth.password,saltRound)
    const newUser = {
        "id":Math.random().toString(),
        "profile": {...request.body.profile,
            "role":'customer',
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString(),
        },
        "auth":{
            "passwordHash":hashPass,
            "lastLogin":null,
            "isLocked":false
        },
        "orders":[],
        "cart":[],
        "address":[]
    }

    // add to db
    axios.post(`${baseURL}/user`,newUser)
    .then((res)=> response.status(200).json({data:res.data}))
    .catch((e)=>{
        console.log(e)
    })
})


userRoute.post('/cart/:id', async (request, response) => {
    const { id } = request.params;
    const { cartItem } = request.body;

    try {
        // Fetch existing user
        const userRes = await axios.get(`${baseURL}/user/${id}`);
        const user = userRes.data;

        // Ensure user has a cart array
        const updatedCart = [...(user.cart || []), cartItem];

        // Update user cart in JSON-Server
        const updateRes = await axios.patch(`${baseURL}/user/${id}`, { cart: updatedCart });

        return response.status(200).json({ msg: 'Record updated', data: updateRes.data });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = userRoute