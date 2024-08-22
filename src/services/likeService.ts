import { AppDataSource } from "../config/datasource";
import { Like } from "../entity/Like";

const likeRepository = AppDataSource.getRepository(Like);

export async function toggleLike(userId: number, boardId: number) {
  const existingLike = await likeRepository.findOne({
    where: { user_id: userId, board_id: boardId },
  });

  if (existingLike) {
    await likeRepository.remove(existingLike);
    return { isLiked: false };
  } else {
    const newLike = likeRepository.create({
      user_id: userId,
      board_id: boardId,
    });
    await likeRepository.save(newLike);
    return { isLiked: true };
  }
}

export async function isLiked(
  userId: number,
  boardId: number,
): Promise<boolean> {
  const existingLike = await likeRepository.findOne({
    where: { user_id: userId, board_id: boardId },
  });
  return !!existingLike;
}
