import dotenv from "dotenv"
import {connectDB} from "../../../Packages/Utils/connect.db.js"
dotenv.config({
    path:"./.env"
})

connectDB(process.env.DATABASE_URL!,process.env.DATABASE_NAME!).then(()=>{
    console.log("Database connected successfully");
}).catch(()=>{
    console.log("Error in database connection")
})