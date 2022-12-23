import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

// import Post from './routes/post.route';
import Auth from "./routes/auth.route";
import UserList from "./routes/userList.route";
import Dept from "./routes/dept.route";
import AdminUser from "./routes/adminUser.route";

import {
  isFaculty,
  isStudentOnly,
  isStudentOrFaculty,
} from "./middleware/accessMiddleware";

import Course from "./routes/course.route";
import { checkAdmin } from "./middleware/authMiddleware";

const app: Express = express();
const port = process.env.PORT || 4000;

const dbUri = process.env.DB_URL || "mongodb://127.0.0.1:27017/scm";

const methods = ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"];

const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const { isAdmin } = require("./middleware/accessMiddleware");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({ origin: "http://localhost:3000", preflightContinue: true, credentials: true, methods })
);
app.use(morgan("common"));

app.use("/api/v1/*", checkUser, checkAdmin);
app.use("/api/v1/auth/", Auth);
app.use("/api/v1/", Course);
app.use("/api/v1/users/", requireAuth, isAdmin, UserList);
app.use("/api/v1/dept/", isStudentOrFaculty, Dept);
app.use("/api/v1/admin/", AdminUser);

app.get("/ping", isStudentOrFaculty, (_: Request, res: Response) => {
  res.json({ ping: "pong" });
});

app.listen(port, async () => {
  await mongoose.connect(dbUri);
  console.log(`🚀 server running on: 🌐http://localhost:${port}`);
});
