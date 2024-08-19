import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export async function checkEmail(req: Request, res: Response) {
  const email = req.query.value as string;

  if (!email) {
    return res.status(400).json({ error: "Email value is required" });
  }

  try {
    const user = await userRepository.findOne({ where: { email } });
    const emailExists = !!user;
    res.status(200).json({ emailExists });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function checkNickname(req: Request, res: Response) {
  const nickname = req.query.value as string;

  if (!nickname) {
    return res.status(400).json({ error: "Nickname value is required" });
  }

  try {
    const user = await userRepository.findOne({ where: { nickname } });
    const nicknameExists = !!user;
    res.status(200).json({ nicknameExists });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
