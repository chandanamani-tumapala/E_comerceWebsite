//import express, userapi 
const express = require("express")
let router = express.Router()
const userApi = require("../apis/userapi")

//Login record 
router.post("/login", userApi.login)
//signup record 
router.post("/signup", userApi.signup)
//logout record 

//update record 
router.put("/update", userApi.update_user)
//deletet record 
router.delete("/delete", userApi.delete_user)
module.exports = router