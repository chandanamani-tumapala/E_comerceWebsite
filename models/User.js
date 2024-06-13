//import mongoose
const mongoose= require('mongoose')
//create schema
const userSchema = new mongoose.Schema({
    u_id: String, 
    u_name: String, 
    u_pwd: String, 
    u_email: String,
    u_addr: String,
    u_contact: String,
    u_type: String 

})
module.exports= mongoose.model("Users", userSchema)