import express from "express";
import dotenv from "dotenv";
import router from "./routes/contactRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middlware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";
const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

//databases
connectDb();

//middlewares
app.use(express.json());
app.use("/api/contacts", router);
app.use("/api/users", userRouter);
app.use(errorHandler);

//creating the server
app.listen(port, () => {
  console.log(`The Port is running at ${port}`);
});
