import { IsNotEmpty } from "class-validator";

export default class ResgisterDto {
  constructor(
    id: string | number,
    email: string,
    password: string,
    fullname: string,
    projectId: string | number
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.fullname = fullname
    this.projectId = projectId;
  }

  public id: string | number;

  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public fullname: string;

  public projectId: string | number
}
