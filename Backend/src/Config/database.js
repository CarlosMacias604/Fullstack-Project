// MongoDB connection configuration
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost:27017/dbPostSpace';

    try {
        await mongoose.connect(dbConnection);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;