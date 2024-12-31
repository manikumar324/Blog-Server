require("dotenv").config();
const mongoose = require("mongoose");

const database_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 60000,
      serverSelectionTimeoutMS: 60000,
    });
    console.log("MongoDB Database Connected Successfully");
  } catch (error) {
    console.error("Error While Connecting to the Database:", error);

    // Retry connection after a delay
    setTimeout(connectDB, 5000); // Retry after 5 seconds
  }
};

module.exports = connectDB;
