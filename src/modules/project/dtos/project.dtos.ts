import { IsNotEmpty } from "class-validator";

export default class ProjectDto {
  constructor(
    id: string | number,
    name: string,
    description: string,
    startDate: string,
    customerId: string | number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.customerId = customerId;
  }

  public id: string | number;

  @IsNotEmpty()
  public name: string;

  public description: string;
  public startDate: string;
  public customerId: string | number;
}
