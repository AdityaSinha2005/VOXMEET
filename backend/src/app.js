import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js"
import userRoutes from "./routes/users.routes.js"
dotenv.config();

const app=express();
const server=createServer(app);//express ka instance ko connect karta hai socket ke server se
const io=connectToSocket(server);

app.set("port",(process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb" , extended:true}))
app.use("/api/v1/users",userRoutes);

const start =async ()=>{
    const connectionDb=await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDb connected");
    server.listen((app.get("port")),()=>{
        console.log(`Listening to port ${app.get("port")}`)
    })
}

start();