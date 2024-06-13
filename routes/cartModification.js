//import express, productapi 
const express = require('express')
let router = express.Router()
const cartApi = require('../apis/cartapi')

//fetch all cart records 
router.post("/fetchcart/", cartApi.fetch_cart)
//insert cart record 
router.post("/insertcart", cartApi.insert_cart)
//update cart record 
router.put("/updatecart", cartApi.update_cart)
//delete products 
router.delete("/deletecartitem", cartApi.delete_cart)
//delete all products 
router.delete("/deletecart", cartApi.delete_all)

module.exports= router