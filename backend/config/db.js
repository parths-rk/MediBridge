import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS: 5000});

        console.log(`✅ MongoDB Connected:${conn.connection.host}`);

    } catch (error){
        console.log(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1); // exit process if DB fails 
    }
};

export default connectDB;