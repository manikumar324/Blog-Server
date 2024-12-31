const { request, response } = require("express");
const grid = require("gridfs-stream");
const mongoose = require("mongoose");

const baseUrl = "https://blog-server-fucr.onrender.com"; // Deployed backend URL

let gfs, gridfsBucket;
const conn = mongoose.connection;

// Set up GridFS once the MongoDB connection is open
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "photos",
  });
  gfs = require("gridfs-stream")(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

// Upload Image Function
exports.uploadImage = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "File Not Found" });
    }

    // Log the uploaded file metadata
    console.log("Uploaded file metadata:", req.file);

    // Construct the image URL using the deployed server's URL
    const imageUrl = `${baseUrl}/file/${req.file.filename}`; // Updated to match the new route for serving files

    // Respond with the image URL
    return res.status(200).json({ message: "File uploaded successfully", url: imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({ message: "Failed to upload image" });
  }
};

// Get Image Function
exports.getImage = async (req, res) => {
  try {
    // Use `req.params.filename` to get the filename from the request parameters
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file || file.length === 0) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set proper content type
    res.set("Content-Type", file.contentType);

    // Create a read stream for the file and pipe it to the response
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    return res.status(500).json({ message: error.message });
  }
};