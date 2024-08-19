import { AppDataSource } from "../config/datasource";
import { Token } from "../entity/Token";
import { User } from "../entity/User";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwtUtils";

interface RefreshTokenResponse {
  accessToken: string;
}

const userRepository = AppDataSource.getRepository(User);
const tokenRepository = AppDataSource.getRepository(Token);

export async function joinUser(
  email: string,
  nickname: string,
  password: string,
) {
  const user = userRepository.create({ email, nickname, password });
  await userRepository.save(user);
  return user;
}

export async function loginUser(email: string, password: string) {
  const user = await userRepository.findOne({ where: { email } });

  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.user_id);
  const refreshToken = generateRefreshToken(user.user_id);

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  const token = tokenRepository.create({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: expiresAt,
    user,
  });

  await tokenRepository.save(token);

  return { accessToken, refreshToken };
}

export async function logoutUser(userId: number) {
  await tokenRepository.delete({ user_id: userId });
}

export const authenticateAccessToken = (accessToken: string) => {
  const decoded = verifyAccessToken(accessToken);
  if (!decoded) throw new Error("Invalid or expired access token");
  return decoded;
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<RefreshTokenResponse> => {
  try {
    const decoded = verifyRefreshToken(refreshToken) as any;
    if (!decoded) throw new Error("Invalid refresh token");

    const user = await userRepository.findOne({
      where: { user_id: decoded.userId },
    });
    if (!user) throw new Error("User not found");

    const accessToken = generateAccessToken(user.user_id);
    return { accessToken };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
