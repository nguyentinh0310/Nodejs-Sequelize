import { NextFunction, Request, Response } from "express";
import ProjectUserDto from "./dtos/project-user.dtos";
import ProjectDto from "./dtos/project.dtos";
import ProjectService from "./project.service";


class ProjectControler {
  private projectService = new ProjectService();
  public getAllProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects = await this.projectService.getAllProject();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  };

  public getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const project = await this.projectService.getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  };

  public createProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ProjectDto = req.body;
      const project = await this.projectService.createProject(model);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  };

  public updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ProjectDto = req.body;
      const project = await this.projectService.updateProject(req.params.id, model);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  };

  public deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.projectService.deleteProject(req.params.id);
      res.status(200).json({ message: "Delete project!" });
    } catch (error) {
      next(error);
    }
  };

  public getAllProjectUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const projects = await this.projectService.getAllProjectUser();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  };

  public createProjectUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: ProjectUserDto = req.body;
      const project = await this.projectService.createProjectUser(model);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  };

  public deleteProjectUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.projectService.deleteProjectUser(req.params.id);
      res.status(200).json({ message: "Delete project-user!" });
    } catch (error) {
      next(error);
    }
  };
}
export default ProjectControler;
