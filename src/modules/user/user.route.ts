import { Route } from '@core/interfaces';
import { authMiddleware, validationMiddleware } from '@core/middlewares';
import { Router } from 'express';
import RegisterDto from './dtos/register.dtos';
import UsersController from './user.controller';

export default class UsersRoute implements Route {
  public path = '/api/users';
  public router = Router();

  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, validationMiddleware(RegisterDto, true), this.usersController.register);
    this.router.put(this.path + '/:id', validationMiddleware(RegisterDto, true), authMiddleware, this.usersController.updateUser);
    this.router.get(this.path + '/:id', this.usersController.getUserById);
    this.router.get(this.path, this.usersController.getAllUser);
    this.router.delete(this.path + '/:id', authMiddleware, this.usersController.deleteUser);

  }
}
