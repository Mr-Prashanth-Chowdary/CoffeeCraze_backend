const User = require('../model/userModel')
const cartRoute = require('express').Router()
const Product = require('../model/productModel')
const userExtractor = require('../middleware/userExtractor')


cartRoute.get('/',userExtractor,async(request,response)=>{
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

// to get all carte data
cartRoute.get('/cartitems', userExtractor,async (request, response) => {
  if (!request.token) {
    return response.status(401).send('unauthorized without token');
  }
  try {
    // Retrieve the user document using the id from the authentication middleware
    
    const user = await User.findById(request.id);
    if (!user) {
      return response.status(404).json({ errorMsg: "User not found" });
    }

    // Get the cart array (assumed to be an array of product IDs)
    const cartIds = user.cart;

    // Fetch product details for each ID in the cart from the Product collection
    const products = await Product.find({ _id: { $in: cartIds } });

    // Return the cart items (complete product data) to the client
    return response.status(200).json({ cartItems: products });
  } catch (e) {
    console.error(e);
    return response.status(500).json({ errorMsg: "internal server error" });
  }
});

// to Remove paticular product
cartRoute.post('/remove/:id',userExtractor, async (request, response) => {
  if (!request.token) {
    return response.status(401).send('unauthorized without token');
  }
  try {
    const productId = request.params.id;
    // Remove the productId from the user's cart
    const updatedUser = await User.findByIdAndUpdate(
      request.id,
      { $pull: { cart: productId } },
      { new: true }
    );
    if (!updatedUser) {
      return response.status(404).json({ errorMsg: "User not found" });
    }
    return response.status(200).json({ msg: "Item removed from cart" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ errorMsg: "internal server error" });
  }
});

cartRoute.post('/citem', userExtractor,async (request, response) => {
    if (!request.token) {
      return response.status(401).send('unauthorized without token');
    }
    try {
      // Extract the product id from req.body
      const { id } = request.body;
      if (!id) {
        return response.status(400).json({ errorMsg: "Product id is required" });
      }
      // Use $addToSet to avoid duplicates
      const updatedUser = await User.findByIdAndUpdate(
        request.id,
        { $addToSet: { cart: id } },
        { new: true, projection: { cart: 1 } }
      );
      return response
        .status(201)
        .json({ msg: "Item added to cart", data: updatedUser });
    } catch (e) {
      console.error(e);
      return response.status(500).json({ errorMsg: "internal server error" });
    }
  });

  cartRoute.get('/:id', userExtractor,async (request, response) => {
    if (!request.token) {
      return response.status(401).send('unauthorized without token');
    }
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).json({ errorMsg: "Product id is required" });
      }
      // Find the user by id and get only the cart field
      const user = await User.findById(request.id, { cart: 1 });
      if (!user) {
        return response.status(404).json({ errorMsg: "User not found" });
      }
      // Check if the provided product id exists in the user's cart
      const exists = user.cart.includes(id);
      return response.status(200).json({ exists });
    } catch (e) {
      console.error(e);
      return response.status(500).json({ errorMsg: "internal server error" });
    }
  });


cartRoute.post('/',userExtractor,async(request,response)=>{
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

cartRoute.delete('/',userExtractor,async(request,response)=>{
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