import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
import { User } from "./entities/User";
import { verify } from "jsonwebtoken";

(async () => {
  const app = express();

  app.use(cookieParser());
  
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true
    })
  );
  
  app.post("/", async (req, res) => {
    const token = req.cookies.cke;
    
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }
    
    let payload: any = null;
    
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.error(error);
      return res.send({ ok: false, accessToken: "" });
    }
    
    const user = await User.findOne({ id: payload.id });
    
    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }
    
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }
    
    sendRefreshToken(res, createRefreshToken(user));
    
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  
  await createConnection();
  
  const server = new ApolloServer({ 
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  
  server.applyMiddleware({
    app,
    cors: false
  });
  
  app.listen({ port: process.env.SERVER_PORT }, () =>
    console.log("Express server started.")
  );
})();