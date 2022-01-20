import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ansureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Recuperando o id do usuário
  const { user_id } = request;

  const userRepositories = getCustomRepository(UsersRepositories);

  //Verifica se usuário é admin
  const user = await userRepositories.findOne(user_id);

  console.log("admin", user?.admin);

  if (user?.admin) {
    return next();
  }

  return response.status(401).json({
    error: "Não autorizado!",
  });
}
