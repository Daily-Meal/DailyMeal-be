import express from "express";
import pool from "./config/mariadb";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//* DB 테스트용 (삭제 예정)
app.get("/test-users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.error("Error querying users:", error);
    res.status(500).send("Server Error");
  }
});

export default app;
