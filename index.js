const express = require('express')
const app = express()
const cors = require("cors");
const playlistRoutes=require('./Routes/Playlist')
const songRoutes= require("./Routes/Song")
const jwt=require('jsonwebtoken')
const authRoutes=require('./Routes/Auth')
const mongoose= require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy,

    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport')
const port = 8000
const User=require('./Models/User')
mongoose.connect("mongodb+srv://teejayamusic:abcd1234@cluster0.dtkekmz.mongodb.net/?retryWrites=true&w=majority",{

useNewUrlParser:true,
useUnifiedtopology:true,
}).then((x)=>{
    console.log('working')
}).catch((err)=>{
    console.log('boo no')
})






var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

  

passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({_id: jwt_payload.identifier}, function (err, user) {
            // done(error, doesTheUserExist)
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    })
);

app.use(cors());
app.get('/',(req,res)=>{
    res.send('hello')
})
app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);
app.listen (port,()=>{
    console.log('listening to port')
})