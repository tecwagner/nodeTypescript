import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  //Receber o token
  const authToken = request.headers.authorization;

  //validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  /*
  Esse metodo converter o token para um array e cria duas posições. 
  Recuperamos somente a segunda posição o token
  */
  const [, token] = authToken.split(" ");

  try {
    //validar o token se é valido
    const { sub } = verify(
      token,
      "60fc7576b533a5f425cab533d9e1efa4"
    ) as IPayload;

    //recuperar o token
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end;
  }
}
