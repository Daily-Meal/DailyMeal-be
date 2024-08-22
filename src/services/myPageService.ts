import { AppDataSource } from "../config/datasource";
import { Board } from "../entity/Board";
import { Like } from "../entity/Like";

const boardRepository = AppDataSource.getRepository(Board);
const likeRepository = AppDataSource.getRepository(Like);

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

export async function getMyLikeBoards(
  userId: number,
  limit: number,
  offset: number,
) {
  const likes = await likeRepository
    .createQueryBuilder("like")
    .where("like.user_id = :userId", { userId })
    .getMany();

  if (likes.length === 0) {
    return { boards: [], total: 0 };
  }

  const boardIds = likes.map(like => like.board_id);

  const boards = await boardRepository
    .createQueryBuilder("board")
    .leftJoin("board.user", "user")
    .addSelect(["user.user_id", "user.nickname"])
    .leftJoinAndSelect("board.meals", "meals")
    .leftJoinAndSelect("board.tags", "tags")
    .where("board.board_id IN (:...boardIds)", { boardIds })
    .orderBy("board.created_at", "DESC")
    .skip(offset)
    .take(limit)
    .getMany();

  const total = boardIds.length;

  return { boards, total };
}
