import { HttpException } from "@core/exceptions";
import { ListResponse } from "@core/interfaces";
import db from "@core/models";
import { isEmptyObject } from "@core/utils";
import bcryptjs from "bcryptjs";
import { v4 } from "uuid";
import RegisterDto from "./dtos/register.dtos";
import { IUser } from "./user.interface";

class UserService {
  public async createUser(model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await db.user.findOne({
      where: { email: model.email },
    });
    if (user) {
      throw new HttpException(409, `Your email ${model.email} already exist`);
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(model.password!, salt);
    const createdUser = await db.user.create({
      ...model,
      id: v4(),
      password: hashPassword,
    });

    return createdUser;
  }

  public async getAllUser(): Promise<ListResponse<IUser>> {
    const users = await db.user.findAll({
      include: {
        model: db.project,
        attributes: ["name", "description"],
        through: { attributes: [] }, // ko lấy bản dính kém
      },
      nest: true,
    });
    const rowCount = await db.user.count();

    return {
      data: users,
      totalRows: rowCount,
    };
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await db.user.findOne({
      where: { id: userId },
      include: { model: db.project, attributes: ["name", "description"] },
      raw: true,
      nest: true,
    });
    if (!user) throw new HttpException(400, "User is not found");
    return user;
  }

  public async updateUser(userId: string, model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await db.user.findOne({
      where: { id: userId },
    });
    if (!user) throw new HttpException(400, "Your id is valid");

    await user.update({
      fullname: model.fullname,
      projectId: model.projectId,
    });

    return user;
  }

  public async deleteUser(userId: string) {
    const user = await db.user.findOne({
      where: { id: userId },
    });
    
    if (!user) throw new HttpException(400, "Your id is valid");

    await user.destroy();
  }
}
export default UserService;
