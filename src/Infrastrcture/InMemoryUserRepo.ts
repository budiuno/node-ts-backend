import { IUserRepo } from "../Application/IUserRepo";
import { User } from "../domain/User";

export class InMemoryUserRepo implements IUserRepo {
  private readonly _users: User[] = [];

  public async save(user: User): Promise<boolean> {
    this._users.push(user);

    return true;
  }
}
