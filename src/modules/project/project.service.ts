import { HttpException } from "@core/exceptions";
import { ListResponse } from "@core/interfaces";
import db from "@core/models";
import { isEmptyObject } from "@core/utils";
import { v4 } from "uuid";
import ProjectUserDto from "./dtos/project-user.dtos";
import ProjectDto from "./dtos/project.dtos";
import { IProject, IProjectUser } from "./project.interface";

class ProjectService {
  public async getAllProject(): Promise<ListResponse<IProject>> {
    const projects = await db.project.findAll({
      order: [["name", "DESC"]],
      include: {
        model: db.customer,
        attributes: ["name"],
      },
      raw: true,
      nest: true,
    });
    const rowCount = await db.project.count();

    return {
      data: projects,
      totalRows: rowCount,
    };
  }

  public async getProjectById(projectId: string): Promise<IProject> {
    const project = await db.project.findOne({
      where: { id: projectId },
    });
    if (!project) throw new HttpException(400, "project is not found");
    return project;
  }

  public async createProject(model: ProjectDto): Promise<IProject> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    const checkCustomerId = await db.customer.findOne({
      where: { id: model.customerId },
    });
    if (!checkCustomerId?.id) {
      throw new HttpException(400, "customerId is not found");
    }
    const newproject = await db.project.create({
      ...model,
      id: v4(),
    });

    return newproject;
  }

  public async updateProject(
    projectId: string,
    model: ProjectDto
  ): Promise<IProject> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const project = await db.project.findOne({
      where: { id: projectId },
    });
    if (!project) throw new HttpException(400, "Your id is valid");

    await project.update({
      name: model.name,
    });

    return project;
  }

  public async deleteProject(projectId: string) {
    const project = await db.project.findOne({
      where: { id: projectId },
    });
    if (!project) throw new HttpException(400, "Your id is valid");

    await project.destroy();
  }

  public async getAllProjectUser(): Promise<ListResponse<IProjectUser>> {
    const projects = await db.project_user.findAll({
      include: [
        {
          model: db.project,
          attributes: ["name", "description"],
        },
        {
          model: db.user,
          attributes: ["fullname", "email"],
        },
      ],
      nest: true,
    });
    const rowCount = await db.project_user.count();

    return {
      data: projects,
      totalRows: rowCount,
    };
  }

  public async createProjectUser(model: ProjectUserDto): Promise<IProjectUser> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    const checkCustomerId = await db.project.findOne({
      where: { id: model.projectId },
    });
    if (!checkCustomerId?.id) {
      throw new HttpException(400, "ProjectID is not found");
    }
    const checkUserId = await db.user.findOne({
      where: { id: model.userId },
    });
    if (!checkUserId?.id) {
      throw new HttpException(400, "UserID is not found");
    }

    const newproject = await db.project_user.create({
      ...model,
      id: v4(),
    });

    return newproject;
  }

  public async deleteProjectUser(projectId: string) {
    const project = await db.project_user.findOne({
      where: { id: projectId },
    });
    if (!project) throw new HttpException(400, "Your id is valid");

    await project.destroy();
  }
}
export default ProjectService;
