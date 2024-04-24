import bodyParser from "body-parser";
import express from "express";
import { zodMiddleware } from "./middlewares/zod.middleware";
import { makeCallback } from "./middlewares/callback";
import { ICreateUserResult } from "../Application/ICreateUserResult";
import { Controllers } from "../controllers";

export class Server {
  public static async run(
    port: number,
    controller: Controllers
  ): Promise<void> {
    const app = express();

    app.use(bodyParser.json());

    app.post(
      "/api/users",
      makeCallback<ICreateUserResult>(controller.createUser.handle)
    );

    // app.get("/api/users", makeCallback<ICreateUserResult[]>(getUsers));

    app.use(zodMiddleware);

    try {
      app.listen(port, () => {
        console.log(`Server started. Listen on ${port}`);
      });
    } catch (error) {
      console.log("Failed to start server ", error);
    }
  }
}
