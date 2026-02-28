import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({
    limit: '10mb' 
}));

app.use(urlencoded({extended:true}));

app.use(cookieParser())

export default app