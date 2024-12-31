const PostDetails = require("../models/postModel");

exports.createPost = async (req, res) => {
  try {
    const newPost = new PostDetails(req.body); // Create a new post
    await newPost.save(); // Save to the database
    console.log("Post Created Successfully");
    return res
      .status(201)
      .json({ message: "Post Published Successfully", newPost });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Error while publishing Poster",
      error: error.message,
    });
  }
};

exports.getAllPosts = async (req, res) => {
  const { category } = req.query;
  console.log(req.query);
  try {
    if (category) {
      const categoryPosts = await PostDetails.find({ category });
      console.log("category Posts", categoryPosts);
      return res.status(200).json(categoryPosts);
    } else {
      // If no category is provided, fetch all posts
      const allPosts = await PostDetails.find({});
      console.log("All Posts:", allPosts);

      return res.status(200).json(allPosts);
    }
  } catch (error) {
    console.log("Error while fetching the posts", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};
// try {
//     const posts = await PostDetails.find(); // `PostDetails` is your Mongoose model
//     res.status(200).json(posts);
//     console.log("All Posts Data fetched Successfully")
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching posts', error: error.message });
//     console.log("Error while fetching the Posts data")
//   }

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const postData = await PostDetails.findById(id);
      return res.status(200).json(postData);
      console.log("Post data fetched Successfully".postData);
    }
  } catch (error) {
    console.log("Error Occured while fetching the postData", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const poster = await PostDetails.findById(id);
    if (!poster) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    // Update the post with $set and add `updatedOn` field
    const postUpdate = await PostDetails.findByIdAndUpdate(
      id,
      {
        $set: { ...req.body }, // Update with timestamp
      },
      { new: true } // Return the updated document
    );
    return res
      .status(200)
      .json({ message: "Post Details Updated Successfully", postUpdate:postUpdate});
    console.log("Post Updated Successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await PostDetails.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post Deleted Successfully" });
    console.log("Post Deleted Successfully");
  } catch (error) {
    return res.status(500).json({ error: error.message });
    console.log("Error While Deleteing the Post");
  }
};
