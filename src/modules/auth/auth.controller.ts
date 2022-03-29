import { TokenData } from "@core/interfaces";
import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import LoginDto from "./dtos/auth.dto";

export default class UsersController {
  private authService = new AuthService();



  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const tokenData: TokenData = await this.authService.login(model);

      res.cookie("jwt", tokenData.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1h
      });

      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };

  public logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("jwt");
      res.status(200).json({ message: "Logout successfully!" });
    } catch (error) {
      next(error);
    }
  };

  public getCurrentLogginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.getCurrentLogginUser(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
