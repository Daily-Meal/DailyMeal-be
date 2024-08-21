import { AppDataSource } from "../config/datasource";
import { Board } from "../entity/Board";
import { Meal } from "../entity/Meal";
import { Tag } from "../entity/Tag";
import { User } from "../entity/User";

const boardRepository = AppDataSource.getRepository(Board);
const userRepository = AppDataSource.getRepository(User);

export async function createBoard(
  userId: number,
  category: string,
  mealType: string,
  image?: string,
  meals?: string[],
  tags?: string[],
) {
  const user = await userRepository.findOne({ where: { user_id: userId } });
  if (!user) throw new Error("User not found");

  return boardRepository.manager.transaction(
    async transactionalEntityManager => {
      const board = boardRepository.create({
        category,
        meal_type: mealType,
        image,
        user_id: userId,
      });

      const savedBoard = await transactionalEntityManager.save(board);

      const mealEntities =
        meals?.map(mealName => ({
          name: mealName,
          board: savedBoard,
        })) ?? [];

      const tagEntities =
        tags?.map(tagName => ({
          name: tagName,
          board: savedBoard,
        })) ?? [];

      await transactionalEntityManager.save(Meal, mealEntities);
      await transactionalEntityManager.save(Tag, tagEntities);

      return savedBoard;
    },
  );
}

export async function getBoards(
  category: string | null,
  limit: number,
  offset: number,
) {
  const boards = await boardRepository
    .createQueryBuilder("board")
    .leftJoin("board.user", "user")
    .addSelect(["user.user_id", "user.nickname"])
    .leftJoinAndSelect("board.meals", "meals")
    .leftJoinAndSelect("board.tags", "tags")
    .where(category ? "board.category = :category" : "1=1", { category })
    .orderBy("board.created_at", "DESC")
    .skip(offset)
    .take(limit)
    .getMany();

  const total = await boardRepository
    .createQueryBuilder("board")
    .where(category ? "board.category = :category" : "1=1", { category })
    .getCount();

  return { boards, total };
}

export async function updateBoard(
  userId: number,
  boardId: number,
  category?: string,
  mealType?: string,
  image?: string,
) {
  const board = await boardRepository.findOne({
    where: { board_id: boardId, user_id: userId },
  });
  if (!board) throw new Error("Board not found or access denied");

  board.category = category ?? board.category;
  board.meal_type = mealType ?? board.meal_type;
  board.image = image ?? board.image;

  return boardRepository.save(board);
}

export async function deleteBoard(userId: number, boardId: number) {
  await boardRepository.manager.transaction(
    async transactionalEntityManager => {
      const board = await transactionalEntityManager.findOne(Board, {
        where: { board_id: boardId, user_id: userId },
      });
      if (!board) throw new Error("Board not found or access denied");

      await transactionalEntityManager.delete(Meal, { board_id: boardId });

      await transactionalEntityManager.delete(Tag, { board_id: boardId });

      await transactionalEntityManager.remove(Board, board);

      return { message: "Board successfully deleted" };
    },
  );
}

export async function getBoardsByUser(
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
