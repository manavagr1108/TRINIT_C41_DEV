import mongoose from "mongoose";
import logger from '../server.js'

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
       logger.info("Connection with Database successful")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB;
