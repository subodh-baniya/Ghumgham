import { connectDB } from "@packages";
import app from "./app.js";

const startServer = async () => {
    try {
        await connectDB();
        console.log("Database connection established. Starting Hotel service...");
        
        app.listen(process.env.PORT, () => {
            console.log(`Hotel service is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

startServer();


