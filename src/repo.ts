import { InMemoryUserRepo } from "./Infrastrcture/InMemoryUserRepo";

export class Repos {
  public readonly inMemmoryUser: InMemoryUserRepo = new InMemoryUserRepo();
}
