import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  return sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { username: user.username, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d"
    }
  );
};