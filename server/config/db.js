const mongoose = require('mongoose');

const dbURL = process.env.DB_URL;
console.log(dbURL);
const connectDB = async () => {
  console.log('Connecting to MongoDB...');
  if (!dbURL) {
    console.error('DB_URL is not defined in environment variables');
    process.exit(1); // Exit process with failure
  }
  try {
    console.log('Inside Try', dbURL);
    await mongoose.connect(dbURL, {
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
}
module.exports = connectDB;
// This code connects to a MongoDB database using Mongoose.