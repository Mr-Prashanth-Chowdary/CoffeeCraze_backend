const admin = require('express').Router()
const User = require('../model/userModel')
const userExtractor = require('.././middleware/userExtractor')

admin.get('/order-list', userExtractor, async (req, res) => {
    if (!req.role) return res.status(401).json('req.role field missing');
    if(req.role !== 'admin') return res.status(401).json('not authorized to get the list')

    try {
        // Find all users with paid orders having orderStatus
        const usersWithPaidOrders = await User.find(
            { 'orders.status': 'paid', 'orders.orderStatus': { $exists: true } },
            { 'profile.name': 1, 'profile.email': 1, 'orders': 1 } // Project necessary fields
        );

        // Format the response to include only the required details
        const formattedOrders = usersWithPaidOrders.flatMap(user =>
            user.orders
                .filter(order => order.status === 'paid' && order.orderStatus) // Ensure orderStatus exists
                .map(order => ({
                    userId: user._id,
                    name: user.profile.name,
                    email: user.profile.email,
                    orderId: order.id,
                    amountPaid: order.amount_paid,
                    orderStatus: order.orderStatus
                }))
        );

     

        res.status(200).json(formattedOrders);
    } catch (error) {
        console.error('Error fetching order list:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


admin.post('/order/shipped', userExtractor, async (req, res) => {
    if (!req.role) return res.status(401).json('req.role field missing');
    if (req.role !== 'admin') return res.status(401).json('Not authorized to view shipped orders.');

    try {
        // Find all users with shipped orders
        const usersWithShippedOrders = await User.find(
            { 'orders.orderStatus': 'shipped' },
            { 'profile.name': 1, 'profile.email': 1, 'orders': 1 }
        );

        // Format the response with the required details
        const shippedOrders = usersWithShippedOrders.flatMap(user =>
            user.orders
                .filter(order => order.orderStatus === 'shipped')
                .map(order => ({
                    userId: user._id,
                    name: user.profile.name,
                    email: user.profile.email,
                    orderId: order.id,
                    amountPaid: order.amount_paid,
                    orderStatus: order.orderStatus
                }))
        );

       
        res.status(200).json(shippedOrders);
    } catch (error) {
        console.error('Error fetching shipped orders:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});



admin.patch('/order/:id/ship', userExtractor, async (req, res) => {
    if (!req.role) return res.status(401).json('req.role field missing');
    if (req.role !== 'admin') return res.status(401).json('Not authorized to update orders.');

    const orderId = req.params.id;

    try {
        // Find the user with the matching order ID
        const user = await User.findOne({ 'orders.id': orderId });

        if (!user) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Update the order status to 'shipped'
        const updatedUser = await User.findOneAndUpdate(
            { 'orders.id': orderId },
            { $set: { 'orders.$.orderStatus': 'shipped' } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Failed to update order status.' });
        }

        // Fetch all shipped orders
        const shippedOrders = updatedUser.orders
            .filter(order => order.orderStatus === 'shipped')
            .map(order => ({
                userId: user._id,
                name: user.profile.name,
                email: user.profile.email,
                orderId: order.id,
                amountPaid: order.amount_paid,
                orderStatus: order.orderStatus
            }));

        res.status(200).json(shippedOrders);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = admin