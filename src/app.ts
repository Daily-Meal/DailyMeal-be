import express from "express";
import { AppDataSource } from "./config/datasource";

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const authRouter = require("./routes/authRoute");
const checkRouter = require("./routes/checkRoute");
const boardRouter = require("./routes/boardRoute");
const myPageRouter = require("./routes/mypageRoute");

app.use("/", authRouter);
app.use("/check", checkRouter);
app.use("/boards", boardRouter);
app.use("/mypage", myPageRouter);

// 데이터베이스 연결 초기화
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(error => console.error("Database connection error:", error));

export default app;
