import cron from "node-cron";
import { checkMonitors } from "./checkMonitor.js";


cron.schedule("* * * * *", async () => {
    console.log("Running checks...");
    await checkMonitors();
});