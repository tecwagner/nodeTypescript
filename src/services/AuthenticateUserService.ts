import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    //Verificamos se o e-mail existe
    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Senha incorreto");
    }

    //Verificamos se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha incorreto");
    }

    // - Gera o token
    const token = sign(
      {
        email: user.email,
      },
      "60fc7576b533a5f425cab533d9e1efa4",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
    return token;
  }
}

export { AuthenticateUserService };
