import connectDB from "./Db/Connect.db.js";

connectDB().then(() => {
    console.log("Database connection established. Starting the server...");
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
}); 

