import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Board } from "../entity/Board";
import { Like } from "../entity/Like";
import { Meal } from "../entity/Meal";
import { Tag } from "../entity/Tag";
import dotenv from "./dotenv";
import { Token } from "../entity/Token";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Board, Like, Meal, Tag, Token], // 모든 엔티티를 추가한다.
  synchronize: true, // synchronize, logging : 개발 중에는 true로 설정할 수 있으나, 프로덕션에서는 false로 두는 것이 좋다.
  logging: true,
});
