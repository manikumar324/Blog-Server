const mongoose = require("mongoose");

// Define the schema for posts
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Add error messages for better debugging
      unique: true, // Ensure title uniqueness
      trim: true, // Automatically remove whitespace from start/end
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Author name is required"], // New field
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Author email is required"], // New field
      trim: true,
      validate: {
        validator: function (value) {
          // Basic email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    createdDate: {
      type: Date,
      default: Date.now, // Default to current date if not provided
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create the model
const postDetails = mongoose.model("PostDetails", postSchema);

// Export the model
module.exports = postDetails;
