import { IsNotEmpty } from "class-validator";

export default class ProjectUserDto {
  constructor(
    id: string | number,
    projectId: string | number,
    userId: string | number
  ) {
    this.id = id;
    this.projectId = projectId;
    this.userId = userId;
  }

  public id: string | number;

  @IsNotEmpty()
  public projectId: string | number;

  @IsNotEmpty()
  public userId: string | number;
}
