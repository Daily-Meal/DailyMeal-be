import { AppDataSource } from "../config/datasource";
import { Board } from "../entity/Board";
import { User } from "../entity/User";

const boardRepository = AppDataSource.getRepository(Board);
const userRepository = AppDataSource.getRepository(User);

export async function createBoard(
  userId: number,
  category: string,
  mealType: string,
  image?: string,
) {
  const user = await userRepository.findOne({ where: { user_id: userId } });
  if (!user) throw new Error("User not found");

  const board = boardRepository.create({
    category,
    meal_type: mealType,
    image,
    user_id: userId,
  });

  return boardRepository.save(board);
}

export async function updateBoard(
  userId: number,
  boardId: number,
  category?: string,
  mealType?: string,
  image?: string,
) {
  try {
    const board = await boardRepository.findOne({ where: { board_id: boardId, user_id: userId } });
    if (!board) throw new Error("Board not found or access denied");

    if (category) board.category = category;
    if (mealType) board.meal_type = mealType;
    if (image) board.image = image;

    const updatedBoard = await boardRepository.save(board);

    return updatedBoard;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update board: ${error.message}`);
    } else {
      throw new Error("Failed to update board due to an unknown error");
    }
  }
}

