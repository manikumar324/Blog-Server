const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    comments:{
        type:String,
        required:true
    },
},
{
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
)

//create the model
//In mongodb database the model is createdd as a commentModel which is in " "
const commentModel = mongoose.model("comments",commentSchema)

//export the model
module.exports = commentModel;