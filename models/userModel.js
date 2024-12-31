const mongoose = require('mongoose')
const {v4 : uuidv4} = require('uuid')

const userSchema = new mongoose.Schema({
    uuid:{
        type:String,
        default : uuidv4,
        unique : true,
        immutable : true
    },
    name : {
        type : String,
        required :true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type: String,
        required : true
    },
},
    {
        timestamps : true
    }
)

const userDetails = mongoose.model("userDetails",userSchema)

module.exports = userDetails;