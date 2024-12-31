const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

// MongoDB URI
const mongoURI = "mongodb+srv://blog-data:blog-data@cluster0.lf64vd1.mongodb.net/Blog-data?retryWrites=true&w=majority";

// GridFS Storage Configuration
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];
    if (match.indexOf(file.mimetype) === -1) {
      // For unsupported file types, use a simple file name
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "photos", // Make sure this matches your MongoDB bucket
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

// Multer Middleware
const upload = multer({ storage });

module.exports = upload;
