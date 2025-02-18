const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    profile: {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String},
        role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    },
    auth: {
        passwordHash: { type: String, required: true },
        lastLogin: { type: Date, default: null },
        resetOTP: { type: String }, // Stores OTP
        otpExpires: { type: Date }, // OTP expiration time
        isLocked: { type: Boolean, default: false }
    },
    orders: { type: [mongoose.Schema.Types.Mixed], default: [] },
    cart: { type: [mongoose.Schema.Types.Mixed], default: [] },
    address: { type: [mongoose.Schema.Types.Mixed], default: [] }
});

module.exports = mongoose.model('User', userSchema);