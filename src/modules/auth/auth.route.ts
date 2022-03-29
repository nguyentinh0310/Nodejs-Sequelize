import { Route } from "@core/interfaces";
import { authMiddleware } from "@core/middlewares";
import { Router } from "express";
import AuthControler from "./auth.controller";

export default class AuthRoute implements Route {
  public path = "/api/auth";
  public router = Router();

  public authController = new AuthControler();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path + "/login", this.authController.login);
    this.router.get(this.path + "/logout", this.authController.logout);
    this.router.get(this.path, authMiddleware, this.authController.getCurrentLogginUser);
  }
}
