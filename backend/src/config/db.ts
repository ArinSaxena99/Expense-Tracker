import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI  as string);
        console.log("MongoDB connection successful")
    }catch(err){
        console.log("MongoDB connection error:",err);
        return ;
    }
} 