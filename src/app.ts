import { Server } from "./Presentation/server";
import { Controllers } from "./controllers";
import { Repos } from "./repo";
import { UseCases } from "./useCases";
import { Validations } from "./validations";

export async function app(): Promise<void> {
  const repos = new Repos(); // init repositories
  const validations = new Validations(); //init validations
  const UC = new UseCases(repos); // init usecases and inject the repository
  const controller = new Controllers(UC, validations); // init controlerr and inject the usecases and validations

  Server.run(5000, controller);
}

app();
