const auth = require('express').Router()
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const mail = require('../services/mailer')
const welcomeTemp = require('../services/Templets/welcomeTemp')
const passport = require('../services/Oauth/googleOauth');
const oauthLoginWelcome = require('../services/Templets/oauthLoginWelcome')
require('dotenv').config()


auth.post('/login',async(request,response)=>{
    const {email,password} = request.body;
    if(!email){
        return response.status(401).json({errorMsg:'email required'})
    }
    if(!password){
        return response.status(401).json({errorMsg:'password required'})
    }

    try{
    // check user exist
    const userData = await User.findOne({"profile.email":email})
    if(!userData){
        return response.status(400).json({msg:'user not found'});
    }
    // password check
    if(!(await bcrypt.compare(password,userData.auth.passwordHash))){
        return response.status(401).json({msg:'password invalid'});
    }

    // jsonwebtoken genration 
    const key = process.env.JWT_SECRET
    const payload = {id:userData._id, username:userData.profile.name,role:userData.profile.role}
    const token = jwt.sign(payload,key,{expiresIn: '5m'})

    // refresh token 
    const refreshToken = jwt.sign(payload,key,{expiresIn:'7d'})
    response.cookie('refreshToken', refreshToken,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    // update userdata lastlogin 
    const updataLastLogin = await User.updateOne({_id:userData._id},{$set:{"auth.lastLogin": new Date()}})

    // responed back to client
    return response.status(200).json({token:token,username:userData.profile.name})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server error'})
    }
})

auth.post('/signup',async(request,response)=>{
    const {emailid,password,username} = request.body

    // encrypt password 
    const saltRounds = 9;
    const hashpass = await bcrypt.hash(password,saltRounds)

    const newUser = new User({
        "profile":{
            "name":username,
            "email":emailid,
            "phone":null,
            "role":"customer",
            "createdAt": new Date().toISOString(),
            "updatedAt": new Date().toISOString()
        },
        "auth":{
            "passwordHash":hashpass,
            "lastLogin":null,
            "isLocked":false
        },
        "orders":[],
        "cart":[],
        "address":[]
    })

    try{
        const saveUser = await newUser.save()
          
        // Attempt to send email—handle any errors separately
         try {
        await mail.sendEmail(
           emailid,
          '👑 Welcome to the R Royal Family - Your 10% Welcome Gift Awaits!',
          welcomeTemp(username)
        );
        console.log('Email sent successfully');
      } catch (emailError) {
        // Log the error, but don't block the response
        console.error('Failed to send email:', emailError);
      }
  
        return response.status(201).json({msg:'user created',data:saveUser})
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server at signup'})
    }
})

auth.post('/refresh',(request,response)=>{
    const refreshToken = request.cookies.refreshToken;
    if(!refreshToken){return response.status(401).json({message: 'Refresh token not found'})}

    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){return response.status(403).json({message: 'Invalid refresh token' })}
        const payload = {id:decoded.id, username:decoded.username,role:decoded.role}
        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'5m'})
        console.log('new token sent')
        return response.status(201).json({ token })
    })
})

auth.post('/logout', (req, res) => {
    res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out successfully' });
});


//google oAuth2.0
auth.get('/google',passport.authenticate('google',{scope:['profile','email']}))

auth.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), async(req, res) => {
    if (!req.user) {
        return res.redirect('/?error=Unauthorized');
    }
    
    const payload = { id: req.user._id, username: req.user.profile.name, role: req.user.profile.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, 
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax'
    });

    // email service
    try{  
        // Attempt to send email—handle any errors separately
         try {
        await mail.sendEmail(
           emailid,
          '👑 Welcome to the R Royal Family - Account access consent',
          oauthLoginWelcome(req.user.profile.name,req.user.profile.email)
        );
        console.log('Email sent successfully');
      } catch (emailError) {
        // Log the error, but don't block the response
        console.error('Failed to send email:', emailError);
      }
    //redirect to home page
        res.redirect(`http://localhost:5173/?token=${token}`);
    }catch(e){
        console.error(e)
        return response.status(500).json({errorMsg:'internal server at signup'})
    }
});

module.exports = auth