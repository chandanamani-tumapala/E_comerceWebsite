//import modules
let express = require("express")
let bodyparser = require("body-parser")
let mongoose = require('mongoose')
let cors = require("cors")
//create rest object 
let app = express()
//set MIME Type as JSON 
app.use(bodyparser.json())
//clinet is not sending form data => encoding JSON
app.use(bodyparser.urlencoded({ 'extended': 'false' }))
//import url 
// let url = require('./url')
require('dotenv').config()
const url= process.env.MONGODB_URL
//enabling CORS 
app.use(cors())
//create a port 
let port = process.env.PORT || 8080

//connect to mongodb database using mongoose
mongoose.connect(url, { dbName: 'minprj' })
    .then(() => {
        console.log("Connection is success")
    }, (errRes) => {
        console.log("Connection is failed", errRes)
    })

//import Routes
const productModification = require('./routes/ProductModification')
const userRoute = require('./routes/Authentication')
const cartModification= require('./routes/cartModification')

//use routes 
app.use('/user', userRoute)
app.use('/product', productModification)
app.use('/cart', cartModification)

app.listen(port, () => {
    console.log("Server listening to port:", port)

})