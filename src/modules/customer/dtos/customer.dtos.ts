import { IsNotEmpty } from "class-validator";

export default class CustomerDto {
  constructor(id: string | number, name: string, info: string) {
    this.id = id;
    this.name = name;
    this.info = info;
  }

  public id: string | number;

  @IsNotEmpty()
  public name: string;

  public info: string;
}
