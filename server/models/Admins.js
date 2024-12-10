const mongoose = require("mongoose") ;

const AdminSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true ,
        unique : true
    } ,
    passowrd : {
        type : String ,
        required : true
    } 
})

const AdminModel = mongoose.model("admins" , AdminSchema)
module.exports = AdminModel