const express = require('express')
const router = express.Router();
const { signupUser , loginUser  } = require('../controller/user-controller');
const { uploadImage, getImage } = require("../controller/image-controller");
const { createPost, getAllPosts, getPost, updatePost, deletePost } = require("../controller/post-controller");
const { addComment, showComments, deleteComment, updateComment } = require("../controller/comment-controller");

const upload = require("../utils/upload");

router.post("/signup",signupUser)
router.post("/login",loginUser)
router.post("/upload",upload.single("file"),uploadImage)
router.get("/uploads/:filename",getImage)
// router.post("/upload",uploadImage)

router.post("/create", createPost);

router.get("/posts", getAllPosts);

router.get("/post/:id",getPost);

router.put("/update/:id",updatePost);

router.delete("/delete/:id", deletePost);

router.post("/comment/new", addComment);

router.get("/comments/:id",showComments);
router.delete("/comment/delete/:id",deleteComment);
router.put("/comment/update/:id",updateComment)

module.exports = router;