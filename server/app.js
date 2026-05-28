import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import WebSocket from "ws";
import cookieParser from "cookie-parser"
import cors from "cors"
import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { adminRouter } from "./routers/adminRouter.js"
import { mentorRouter } from "./routers/mentorRouter.js"
import { aprenantRouter } from "./routers/aprenantRouter.js"
import { userRouter } from "./routers/userRouter.js"
import { sessionRouter } from "./routers/sessionRouter.js"
import { sessionFeedbackRouter } from "./routers/sessionFeedbackRouter.js"
import { mentorshipRequestRouter } from "./routers/mentorshipRequestRouter.js"
import { messageRouter } from "./routers/messageRouter.js";

dotenv.config();
const port = process.env.PORT || 8082;
const dbURI = process.env.DBURI;

const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`this app is running in port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// cloudinary configuration 

cloudinary.config({
  cloud_name: 'devq06psf',
  api_key: '314892682655296',
  api_secret: 'cn077LJvBNiAM4OXA8D_CZl5VyQ',
});


// Multer configuration

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

// web socket

// const wss = new WebSocket.Server({ port: 8080 }); 

// wss.on('connection', (ws) => {
//   console.log('WebSocket client connected');

//   ws.on('message', (message) => {
//     console.log(`Received message: ${message}`);
//     // handle the incoming message from the client
//   });

//   ws.on('close', () => {
//     console.log('WebSocket client disconnected');
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  optionsSuccessStatus: 204,
  credentials: true
}))

// // app.use('/upload', express.static('upload'));
app.use(upload.single("image"))
// app.use(upload.single("image"));

app.use("/admins", adminRouter)
app.use("/mentors", mentorRouter);
app.use("/aprenants", aprenantRouter)
app.use("/users", userRouter)
app.use("/sessions", sessionRouter)
app.use("/sessionFeedbacks", sessionFeedbackRouter)
app.use("/requests", mentorshipRequestRouter)
app.use("/message", messageRouter)
