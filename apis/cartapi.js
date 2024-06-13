//import cart db 
const Cart = require("../models/Cart");
const { updateOne } = require("../models/Product");

//inserting a product to the cart 
const insert_cart = async (req, res) => {
    const cart = new Cart({
        p_id: req.body.p_id,
        p_img: req.body.p_img,
        p_cost: req.body.p_cost,
        u_name: req.body.u_name,
        qty: 1
    })
    try {
        const savecart = await cart.save()
        console.log("Products are inserted in cart")
        res.send(savecart)
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error)
    }

}

//updating a product in the cart 
const update_cart = async (req, res) => {
    let u_name = req.body.u_name
    let p_id = req.body.p_id
    const cart = {
        qty: req.body.qty
    }
    try {
        const updatecart = await Cart.updateOne({ u_name: u_name, p_id: p_id }, cart)
        if (updatecart.modifiedCount != 0) {
            console.log("Data is modified")
            res.send(updatecart)
        }
        else {
            console.log("Cart data is not found, updation is not performed")
            res.send({ "message": "Cart data is not found" })
        }
    }
    catch(error) {
        console.log("Error is : ", error)
        res.status(400).send(error)
    }
}

//deleting all products in the cart 
const delete_all = async(req, res) => {
    let u_name= req.body.u_name 
    try {
        const deleteallcart= await Cart.deleteMany({u_name: u_name})
        if(deleteallcart.deletedCount!=0)
            {
                console.log('Product Deleted')
                res.send({'delete': 'Success'})
            }
            else {
                console.log("Products are not deleted")
                res.send({'delete': "Record is not found "})
            }
    }
    catch(error) {
        res.status(400).send(error)
    }
}

//delete specific products in the cart 
const delete_cart = async(req,res) => {
    let u_name= req.body.u_name 
    let p_id= req.body.p_id 
    try {
        const deletecart= await Cart.deleteOne({u_name: u_name, p_id: p_id})
        if(deletecart.deletedCount!=0) {
            console.log("Product in cart is deleted")
            res.send({'delete': 'success'})
        }
        else {
            console.log("cart products are not deleted")
            res.send({'delete': 'Record is not found'})
        }
    }
    catch(error) 
    {
        res.status(400).send(error)
    }
}

//fetch cart 
const fetch_cart = async(req, res) => {
    let u_name= req.body.u_name 
    try {
        const fetchcart= await Cart.find({u_name: u_name})
        if(fetchcart.modifiedCount!=0){
        console.log("Products are fetched from the cart")
        res.send(fetchcart)
        }
        else {
            console.log("Cart data is fetched")
            res.send(fetchcart)
        }
    }
    catch(error) {
        res.status(400).send(error)
    }
}

module.exports= {
    fetch_cart,
    delete_all,
    delete_cart,
    insert_cart,
    update_cart
}