import express from "express";
import { AppDataSource } from "./config/datasource";
import { User } from "./entity/User";

const app = express();
app.use(express.json());

// 데이터베이스 연결 초기화
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(error => console.error("Database connection error:", error));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//* DB 테스트용 (삭제 예정)
app.get("/test-users", async (req, res) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find(); // 모든 유저 데이터 조회
    res.json(users);
  } catch (error) {
    console.error("Error querying users:", error);
    res.status(500).send("Server Error");
  }
});

export default app;
