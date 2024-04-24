import { createUserSchema } from "./validations/createUser.schema";

export class Validations {
  public readonly createUser = createUserSchema;
}
