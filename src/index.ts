import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

// import Post from './routes/post.route';
import Auth from "./routes/auth.route";

import UserList from "./routes/userList.route";

import {
  isFaculty,
  isStudentOnly,
  isStudentOrFaculty,
} from "./middleware/accessMiddleware";

import Course from "./routes/course.route";

const app: Express = express();
const port = process.env.PORT || 5000;

const dbUri = process.env.DB_URL || "mongodb://127.0.0.1:27017/scm";

const methods = ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const { isAdmin } = require("./middleware/accessMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: "*", preflightContinue: true, credentials: true, methods })
);
app.use(morgan("common"));

app.use("/api/v1/auth/", Auth);
app.use("/api/v1/", Course);

app.get("/ping", isStudentOrFaculty, (_: Request, res: Response) => {
  res.json({ ping: "pong" });
});

app.use("/api/v1/users/", isAdmin, UserList);

app.listen(port, async () => {
  await mongoose.connect(dbUri);
  console.log(`🚀 server running on: 🌐http://localhost:${port}`);
});
