import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

// import Post from './routes/post.route';
import Auth from "./routes/auth.route";

const app: Express = express();
const port = process.env.PORT || 4000;

const dbUri = process.env.DB_URL || 'mongodb://127.0.0.1:27017/scm';

const methods = ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const { isAdmin, isLibrarian } = require("./middleware/accessMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: "*", preflightContinue: true, credentials: true, methods })
);
app.use(morgan("common"));

// app.use("/api/v1/", Post);
app.use("/api/v1/auth/", Auth);

app.get("/ping", (_: Request, res: Response) => {
  res.json({ ping: "pong" });
});

app.listen(port, async () => {
  await mongoose.connect(dbUri);
  console.log(`🚀 server running on: 🌐http://localhost:${port}`);
});
