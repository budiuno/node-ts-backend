import { Request, Response } from "express";

export interface IResponse<T> {
  data: T;
}

type ControllerFunction<T> = (
  req: Request,
  res: Response
) => Promise<IResponse<T>>;

export function makeCallback<T>(controller: ControllerFunction<T>) {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller(req, res);
      res.json(response);
    } catch (err) {
      res.status(500).send({ error: err });
    }
  };
}
