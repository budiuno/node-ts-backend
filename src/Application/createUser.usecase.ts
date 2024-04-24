import { ICreateUser } from "../validations/createUser.schema";
import { User } from "../domain/User";
import { IUserRepo } from "./IUserRepo";
import { ICreateUserResult } from "./ICreateUserResult";

export class CreateUserUC {
  public constructor(private readonly _userRepo: IUserRepo) {}

  public async execute(input: ICreateUser): Promise<ICreateUserResult> {
    console.log("usecase execute");
    const user = new User(input.name, input.phone, input.email, input.password);
    console.log("usecase", user);

    const result = await this._userRepo.save(user);

    if (!result) {
      throw new Error("Failed to save User");
    }

    const userResult: ICreateUserResult = {
      userID: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
    };

    return userResult;
  }
}
