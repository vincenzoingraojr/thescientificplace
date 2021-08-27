import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("cke", token, {
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + 9000000000)
  });
};