//import db Schema 
const Product = require("../models/Product")

//Insert a new Product into products schema by Vender
const insert_product = async (req, res) => {
    const product = new Product({
        p_id: req.body.p_id,
        p_name: req.body.p_name,
        p_cost: req.body.p_cost,
        p_cat: req.body.p_cat,
        p_img: req.body.p_img,
        p_desc: req.body.p_desc
    })
    try {
        const saveProduct = await product.save()
        console.log('Products are inserted')
        res.send(saveProduct)
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}

//delete an existing product by the Vender 
const delete_product = async (req, res) => {
    let p_id = req.body.p_id
    try {
        const deleteProduct = await Product.deleteOne({ p_id })
        if (deleteProduct.deletedCount != 0) {
            console.log("Product is Deleted")
            res.send({ 'delete': 'success' })
        }
        else {
            console.log("Product not deleted")
            res.send({ 'delete': 'Record not found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}

//update an Existing product by the Vender
const update_product = async (req, res) => {
    let p_id = req.body.p_id
    console.log(p_id)
    const product = {
        p_name: req.body.p_name,
        p_cost: req.body.p_cost,
        p_cat: req.body.p_cat,
        p_img: req.body.p_img,
        p_desc: req.body.p_desc
    }
    try {
        const updateProduct = await Product.updateOne({ p_id }, product)
        if (updateProduct.modifiedCount != 0) {
            console.log('product is updated', updateProduct)
            res.send({ 'update': 'success' })
        }
        else {
            console.log('product not updated')
            res.send({ 'update': 'Record is not found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}

//Display of products
const all_products = async (req, res) => {
    try {
        const products = await Product.find()
        console.log("Data Sent")
        res.json(products)
    }
    catch (error) {
        console.log("Fetch Error :-", error)
        res.status(400).send(error)
    }
}

module.exports = {
    all_products,
    update_product,
    insert_product,
    delete_product
}