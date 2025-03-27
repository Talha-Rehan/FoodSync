import mongoose from 'mongoose';

const connectDB = async (uri: string): Promise<void> => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('An unknown error occurred');
        }
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
