import axios from "axios";
import monitorModel from "../models/monitor.js";
import resultModel from "../models/checkResult.js";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

await connectDB();

export async function checkMonitors() {
    const monitors = await monitorModel.find();
    for (const monitor of monitors){
try {
    const start = Date.now();
    const response = await axios.get(monitor.url,{
        timeout: 5000,
    });
    const responseTime = Date.now() - start;

    await resultModel.create({
        monitor: monitor._id,
        status: "UP",
        responseTime,
        statusCode: response.status
    });

    monitor.isActive = true;
    await monitor.save();
    
}
 catch (err) {
    await resultModel.create({
        monitor: monitor._id,
        status: "DOWN",
        responseTime: 0,
        statusCode: 0,
    });

    monitor.isActive = false;
    await monitor.save();
}
}}

