import { HttpException } from "@core/exceptions";
import { TokenData } from "@core/interfaces";
import db from "@core/models";
import { generateJwtToken, isEmptyObject } from "@core/utils";
import { IUser } from "@modules/user";
import bcryptjs from "bcryptjs";
import LoginDto from "./dtos/auth.dto";

class AuthService {
  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    const formatedEmail = String(model.email).trim().toLowerCase();
    const user = await db.user.findOne({
      where: { email: formatedEmail },
      raw: true,
    });
    if (!user) {
      throw new HttpException(409, `Your email ${model.email} is not exist.`);
    }
    const isMatchPassword = await bcryptjs.compare(
      model.password,
      user.password
    );
    if (!isMatchPassword) throw new HttpException(400, "Password is not match");

    return generateJwtToken(user.id);
  }

  public async getCurrentLogginUser(userId: string): Promise<IUser> {
    const user = await db.user.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException(409, `User is not exist.`);
    }
    return user;
  }
}

export default AuthService;
