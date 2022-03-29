import { HttpException } from "@core/exceptions";
import { ListResponse } from "@core/interfaces";
import db from "@core/models";
import { isEmptyObject } from "@core/utils";
import { v4 } from "uuid";
import { ICustomer } from "./customer.interface";
import CustomerDto from "./dtos/customer.dtos";

class CustommerService {
  public async getAllCustomer(): Promise<ListResponse<ICustomer>> {
    const customers = await db.customer.findAll();
    const rowCount = await db.customer.count();

    return {
      data: customers,
      totalRows: rowCount,
    };
  }

  public async getCustomerById(customerId: string): Promise<ICustomer> {
    const customer = await db.customer.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new HttpException(400, "customer is not found");
    return customer;
  }

  public async createCustomer(model: CustomerDto[]): Promise<ICustomer[]> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const currentArr = await db.customer.findAll({
      attributes: ["name", "info"],
      raw: true,
    });
    const persists: CustomerDto[] = model.filter(
      ({ name: name1 }: any) =>
        !currentArr.some(({ name: name2 }: any) => name2 === name1)
    );
    console.log(currentArr);
    console.log("persists", persists);
    // const newcustomer = await db.customer.bulkCreate(persists);

    return persists;
  }

  public async updateCustomer(
    customerId: string,
    model: CustomerDto
  ): Promise<ICustomer> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const customer = await db.customer.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new HttpException(400, "Your id is valid");

    await customer.update({
      name: model.name,
    });

    return customer;
  }

  public async deleteCustomer(customerId: string) {
    const customer = await db.customer.findOne({
      where: { id: customerId },
    });
    if (!customer) throw new HttpException(400, "Your id is valid");

    await customer.destroy();
  }
}
export default CustommerService;
