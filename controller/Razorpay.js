
const express = require("express");
const pay = express.Router();
const Razorpay = require("razorpay");
const baseURL = require('../utils/config');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const User = require('../model/userModel')
const mali = require('../services/mailer')
const userExtractor = require('../middleware/userExtractor')
const orderSuccessTemp = require('../services/Templets/orderSucessTemp')
require("dotenv").config();


const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

pay.post("/create-order",userExtractor, async (req, res) => {
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
pay.get('/payment-success',userExtractor,async(req,res)=>{
  res.redirect('http://localhost:5173/paymentsuccess')
})



pay.post("/verify-payment",userExtractor, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const key_secret = process.env.KEY_SECRET;
  const body = razorpay_order_id + '|' + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(body, razorpay_signature, key_secret);
    if (!isValidSignature) {
      return res.status(400).json({ status: 'error', message: 'Invalid signature' });
    }

    const userData = await User.findById(req.id);
    if (!userData) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Update order details
    const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
    const orderIndex = userData.orders.findIndex(orderObj => orderObj.id === razorpay_order_id);
    if (orderIndex !== -1) {
      userData.orders[orderIndex] = {
        ...userData.orders[orderIndex],
        amount_due: userData.orders[orderIndex].amount_due - paymentDetails.amount,
        amount_paid: paymentDetails.amount / 100,
        status: "paid",
        orderStatus: "yet_to_be_Shipped",
        payment_id: razorpay_payment_id,
      };
      await userData.save();
    }

    // Attempt to send email—handle any errors separately
    try {
      await mali.sendPaymentSuccessEmail(
        userData.profile.email,
        'Your payment has been successful',
        orderSuccessTemp(userData.profile.name,razorpay_order_id,paymentDetails.amount/100, new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }))
      );
      console.log('Email sent successfully');
    } catch (emailError) {
      // Log the error, but don't block the response
      console.error('Failed to send email:', emailError);
      // Optionally, set a flag or log this event for later review
    }

    const paydata = {amountPaid:(paymentDetails.amount/100),paymentId:paymentDetails.id,date:paymentDetails.created_at}
    console.log(paymentDetails)
    console.log('Payment verification and order update successful');
    return res.status(200).json({ status: 'ok', message: 'Payment verified and order updated',paydata:paydata});
  } catch (e) {
    console.error('Error verifying payment:', e);
    return res.status(500).json({ status: 'error', message: 'Error verifying payment' });
  }
});

module.exports = pay;
