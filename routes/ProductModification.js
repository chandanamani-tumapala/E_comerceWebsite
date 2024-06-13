//import express, productapi 
const express = require('express')
let router = express.Router()
const productApi = require('../apis/productapi')

//fetch all records 
router.get('/fetch', productApi.all_products)
//inserting products 
router.post('/insert', productApi.insert_product)
//update products
router.put('/update', productApi.update_product)
//delete products 
router.delete('/delete', productApi.delete_product)

module.exports= router