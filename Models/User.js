const mongoose = require('mongoose')
const User = new mongoose.Schema({
 firstName:{
    type:String,
    required:true,
 },
 lastName:{
    type:String,
    required:true,
 },
 password: {
   type: String,
   required: true,
   private: true,
 },
 email:{
    type:String,
    required:true,
 },

 username:{
    type:String,
    required:true,
 },
 likedSongs:{
    type:String,
   defaut:'',
 },
 addPlaylist:{
    type:String,
   deafult:'',
 },
 addSubs:{
    type:String,
   deafult:'',
 }



})

const userModel= mongoose.model('User',User)
module.exports=userModel