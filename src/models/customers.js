const mongoose = require('mongoose')



const schema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    mensaje: String,
})

//MVC    -    MODEL VIEW CONTROLLER

const Model = mongoose.model('customers', schema)

module.exports = Model