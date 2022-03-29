import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import { Router } from "express";
import ProjectUserDto from "./dtos/project-user.dtos";
import ProjectDto from "./dtos/project.dtos";
import ProjectControler from "./project.controller";


export default class ProjectRoute implements Route {
  public path = "/api";
  public router = Router();

  public projectController = new ProjectControler();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path + '/projects', this.projectController.getAllProject);
    this.router.get(this.path + '/projects/:id', this.projectController.getProjectById);
    this.router.post(this.path + '/projects' , validationMiddleware(ProjectDto, true), this.projectController.createProject);
    this.router.put(this.path + '/projects/:id', validationMiddleware(ProjectDto, true), authMiddleware, this.projectController.updateProject);
    this.router.delete(this.path + '/projects/:id', authMiddleware, this.projectController.deleteProject);

    this.router.get(this.path + '/project-users', this.projectController.getAllProjectUser);
    this.router.post(this.path + '/project-users' , validationMiddleware(ProjectUserDto, true), this.projectController.createProjectUser);
    this.router.delete(this.path + '/project-users/:id', authMiddleware, this.projectController.deleteProject);

  }
}
