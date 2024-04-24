import { CreateUserController } from "./Presentation/controller/createUser.controller";
import { UseCases } from "./useCases";
import { Validations } from "./validations";

export class Controllers {
  public constructor(
    private readonly _UCs: UseCases,
    private readonly _validationSchemes: Validations
  ) {}
  public readonly createUser = new CreateUserController(
    this._UCs.createUser,
    this._validationSchemes.createUser
  );
}
