import { AppDataSource } from "../config/datasource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export async function checkEmailExists(email: string): Promise<boolean> {
  const user = await userRepository.findOne({ where: { email } });
  return !!user;
}

export async function checkNicknameExists(nickname: string): Promise<boolean> {
  const user = await userRepository.findOne({ where: { nickname } });
  return !!user;
}
