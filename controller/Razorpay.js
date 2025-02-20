const { default: axios } = require("axios");
const express = require("express");
const pay = express.Router();
const Razorpay = require("razorpay");
const baseURL = require('../utils/config');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const User = require('../model/userModel')
const mali = require('../services/mailer')
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

pay.post("/create-order", async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body;
    
    if (!amount || !currency || !receipt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const options = {
      amount: amount * 100, // Convert amount to smallest currency unit
      currency,
      receipt,
      notes,
    };

    // Create order
    const order = await razorpay.orders.create(options);
    console.log("Order created:", order);

    // add this order to db.json
    const userData = await User.findById(req.id);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!userData.orders) {
      userData.orders = [];
    }
    userData.orders.push({...order,amount:amount});
    await userData.save();
    res.status(201).json(order);

  } catch (e) {
    console.error("Error creating order:", e);
    res.status(500).json({ error: "Internal Server Error", details: e.message });
  }
});


// need to update
pay.get('/payment-success',async(req,res)=>{
  res.redirect('http://localhost:5173/paymentsuccess')
})

pay.post("/verify-payment",async(req,res)=>{
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
  const key_secret = process.env.KEY_SECRET
  const body = razorpay_order_id+'|'+razorpay_payment_id
  try{
    const isValidSignature = validateWebhookSignature(body,razorpay_signature,key_secret)
    if(isValidSignature){


    

      const userData = await User.findById(req.id);
      if (!userData) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
      }
      
       
        
      // Fetch payment details from Razorpay
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      console.log(paymentDetails)

      // Find the order by razorpay_order_id
      const orderIndex = userData.orders.findIndex((orderObj) => orderObj.id === razorpay_order_id);
      if (orderIndex !== -1) {
        // Update the order status and payment ID
        userData.orders[orderIndex] = {
          ...userData.orders[orderIndex],
          amount_due: userData.orders[orderIndex].amount_due -  paymentDetails.amount,
          amount_paid: paymentDetails.amount / 100,
          status: "paid",
          payment_id: razorpay_payment_id,
        };
        await userData.save();
      res.status(200).json({status:'ok'})
      console.log('payment verification successful')
    }
  }
}catch(e){
    console.log(e)
    res.status(500).json({status:'error', message:'Error veryfing Payment'})
  }
})

module.exports = pay;
