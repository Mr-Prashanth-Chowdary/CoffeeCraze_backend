const passport = require('passport');
const userModel = require('../../model/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:3001/api/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({ "profile.email": profile.emails[0].value });

        if (!user) {
            user = new userModel({
                "profile": {
                    "name": profile.displayName,
                    "email": profile.emails[0].value,
                    "phone": null,
                    "role": "customer",
                    "createdAt": new Date().toISOString(),
                    "updatedAt": new Date().toISOString()
                },
                "auth": {
                    "passwordHash": 12341234, // No password for OAuth users but as pass is required field it set to google refreshToken
                    "lastLogin": new Date().toISOString(),
                    "isLocked": false
                },
                "orders": [],
                "cart": [],
                "address": []
            });

            await user.save();
        } else {
            user.auth.lastLogin = new Date().toISOString();
            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;
