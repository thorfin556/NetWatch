import mongoose from "mongoose";

// const dns = require('dns')
import dns from "dns";


dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI);
      console.log("DB Connected");
  }  catch (err) {

    console.error("MongoDB connection failed:", err.message);

    process.exit(1);

  }
};
