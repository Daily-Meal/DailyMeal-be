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
