import { Request, Response } from "express";
import { CreateUserUC } from "../../Application/createUser.usecase";
import { ZodSchema } from "zod";
import { IResponse } from "../middlewares/callback";
import { ICreateUserResult } from "../../Application/ICreateUserResult";

export class CreateUserController {
  public constructor(
    private readonly _useCase: CreateUserUC,
    private readonly _schemaValidation: ZodSchema
  ) {}

  public handle = async (
    req: Request,
    res: Response
  ): Promise<IResponse<ICreateUserResult>> => {
    const payload = req.body;
    this._schemaValidation.parse(payload);
    try {
      // zod will throw error and return 400 if validation failed
      console.log("after validation");

      const user = await this._useCase.execute({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        password: payload.password,
        consfirmPassword: payload.consfirmPassword,
      });

      console.log("User", user);

      return { data: user };
    } catch (error) {
      throw new Error(`Error at controller : %${error}`);
    }
  };
}

// perform create user
// bcrypt the password
// insert to postgresql

// export async function getUsers(req: Request, res: Response) {
//   console.log(req);

//   return users;
// }
