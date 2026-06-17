import express from "express";
import cors from "cors";
import 'dotenv/config';
import {  connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import monitorRouter from "./routes/monitorRoutes.js";
import { checkMonitors } from "./utils/checkMonitor.js";
import "./utils/cronJob.js";

dotenv.config();

const app = express();
const port = 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

// DB
connectDB();

// Routes
app.use('/api/user',userRouter);
app.use("/api/monitors", monitorRouter);

app.get('/',(req,res)=>{
    res.send("api working")
})

app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`);
    
})