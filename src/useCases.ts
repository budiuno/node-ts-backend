import { CreateUserUC } from "./Application/createUser.usecase";
import { Repos } from "./repo";

export class UseCases {
  public constructor(private readonly _repo: Repos) {}

  public readonly createUser = new CreateUserUC(this._repo.inMemmoryUser);
}
