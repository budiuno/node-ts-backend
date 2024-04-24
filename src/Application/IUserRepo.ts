import { User } from "../domain/User";

export interface IUserRepo {
  save(user: User): Promise<boolean>;
}
