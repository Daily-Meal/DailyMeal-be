import { AppDataSource } from "../config/datasource";
import { Board } from "../entity/Board";

const boardRepository = AppDataSource.getRepository(Board);

export async function getMyBoards(
  userId: number,
  limit: number,
  offset: number,
) {
  const boards = await boardRepository
    .createQueryBuilder("board")
    .leftJoin("board.user", "user")
    .addSelect(["user.user_id", "user.nickname"])
    .leftJoinAndSelect("board.meals", "meals")
    .leftJoinAndSelect("board.tags", "tags")
    .where("board.user_id = :userId", { userId })
    .orderBy("board.created_at", "DESC")
    .skip(offset)
    .take(limit)
    .getMany();

  const total = await boardRepository
    .createQueryBuilder("board")
    .where("board.user_id = :userId", { userId })
    .getCount();

  return { boards, total };
}
