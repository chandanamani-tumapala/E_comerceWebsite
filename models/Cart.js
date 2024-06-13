//import mongoose 
let mongoose= require("mongoose")
//create a cart schema
const cartSchema= new mongoose.Schema ({
    p_id: String, 
    p_img: String, 
    p_cost: String,
    u_name: String,
    qty:Number
})
//export the scehma
module.exports= mongoose.model("carts", cartSchema)