import http from "http";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { router } from "./routes/productRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const server = express();
    server.use(express.json());
    server.use(fileUpload());

    // routes
    server.get("/", (req, res) => {
      res.send("<h1>File Upload Starter<h1/>");
    });

    server.use("/api/v1/products", router);

    // error handling middleware
    server.use(errorHandlerMiddleware);

    // not found middleware
    server.use(notFound);

    const PORT = process.env.PORT || 8000;
    http.createServer(server).listen(PORT, function () {
      console.info("Server is listening on: ", this.address());
    });
  } catch (error) {
    console.log(error);
  }
};

start();
