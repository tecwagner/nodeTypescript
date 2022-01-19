import { Request, Response, NextFunction } from "express";

export function ansureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Verifica se usuário é admin
  const admin = true;

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Não autorizado!",
  });
}
