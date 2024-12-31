
const comments = require("../models/commentModel");

exports.addComment = async ( req, res) =>{
    try{
        const comment = await new comments(req.body)
        comment.save();

        return res.status(200).json({message:"Comment Added Successfully"})
        console.log("Comment Added Successfully")
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
}

exports.showComments = async ( req, res)=>{
    const { id } = req.params;
    try{
        const allComments = await comments.find({ postId : id})
        return res.status(200).json(allComments)
        console.log("Comments Fetched Successfully")
    }
    catch(error){
        return res.status(404).json({message : "Comments Not Found"})
    }
}

exports.deleteComment = async ( req, res )=>{
    const { id } = req.params;
    try{
        await comments.findByIdAndDelete(id)
        return res.status(200).json({message:"Comment Deleted Successfully"})
        console.log("Comment Deleted Successfully")
    }
    catch(error){
        return res.status(500).json({message:"Error while Deleting the Comment"})
        console.log("Error while Deleting the Comment")
    }
}

exports.updateComment = async ( req, res)=>{
    try {
        const updatedComment = await comments.findByIdAndUpdate(req.params.id, { comments: req.body.comments }, { new: true });
        res.status(200).json(updatedComment);
        console.log("Comment Updated Successfully")
      } catch (error) {
        res.status(500).json({ message: "Error while updating the comment" });
      }
}