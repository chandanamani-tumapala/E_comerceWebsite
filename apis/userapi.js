//import db schema 
const Product = require("../models/Product")
const User = require("../models/User")
//import token 
let token = require("../token/token")
//login authentication 
const login = async (req, res) => {
    let u_name = req.body.u_name
    let u_pwd = req.body.u_pwd
    let obj = { u_name: u_name, u_pwd: u_pwd }
    try {
        const user = await User.find({ u_name: u_name })
        if (user.length == 0) {
            console.log("User not found")
            res.send({ "message": "User not found.. Please enter correct email" })
        } else {
            if (user[0].u_pwd != u_pwd) {
                console.log("Wrong Password")
                res.send({ "message": "Wrong user Credentials" })
            }
            else {
                let myToken = token(obj, new Date().toString())
                res.json({ 'auth': "Success", token: myToken })
            }
        }
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}


//signin 
const signup = async (req, res) => {
    const user = new User({
        u_id: req.body.u_id,
        u_name: req.body.u_name,
        u_pwd: req.body.u_pwd,
        u_email: req.body.u_email,
        u_addr: req.body.u_addr,
        u_contact: req.body.u_contact
    })
    try {

        if ((await User.find({ u_id: user.u_id })).length > 0) {
            res.send({ "message": "User name already present try another" })
            console.log("username already exists")

        }
        else {
            const saveUser = await user.save()
            console.log("User credentials Created")
            res.send(saveUser)
        }
    }
    catch (error) {
        res.status(400).send(error)
        console.log(error)
    }
}

//update 
const update_user = async (req, res) => {
    let u_id = req.body.u_id
    const user = {
        u_name: req.body.u_name,
        u_pwd: req.body.u_pwd,
        u_email: req.body.u_email,
        u_addr: req.body.u_addr,
        u_contact: req.body.u_contact
    }
    try {
        if (await User.findOne({ u_name: user.u_name })) {
            res.send({ "message": "User name is already exist try another username" })
            console.log("User name exists")
        }
        else {
            const updateUser = await User.updateOne({ u_id: u_id }, user)
            if (updateUser.modifiedCount != 0) {
                console.log('product updated', updateUser)
                res.send({ 'update': 'success' })
            }
            else {
                console.log("product not updated")
                res.send({ "update": "Record not found" })
            }
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}
//delete user account 
const delete_user = async (req, res) => {
    let u_id = req.body.u_id
    try {
        const deleteUser = await User.deleteOne({ u_id })
        if (deleteUser.deletedCount != 0) {
            console.log("User is Deleted")
            res.send({ 'delete': 'success' })
        }
        else {
            console.log("User not deleted")
            res.send({ 'delete': 'Record not found' })
        }
    }
    catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    signup,
    login,
    update_user,
    delete_user
}