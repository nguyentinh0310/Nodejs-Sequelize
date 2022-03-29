import { NextFunction, Request, Response } from "express";
import CustommerService from "./customer.service";
import CustomerDto from "./dtos/customer.dtos";



class CustomerControler {
  private  custommerService = new CustommerService();
  public getAllCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const customers = await this.custommerService.getAllCustomer();
      res.status(200).json(customers);
    } catch (error) {
      next(error);
    }
  };

  public getCustomerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const customer = await this.custommerService.getCustomerById(req.params.id);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  };

  public createCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CustomerDto[] = req.body;
      const customer = await this.custommerService.createCustomer(model);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  };

  public updateCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CustomerDto = req.body;
      const customer = await this.custommerService.updateCustomer(req.params.id, model);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  };

  public deleteCustomer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.custommerService.deleteCustomer(req.params.id);
      res.status(200).json({ message: "Delete customer!" });
    } catch (error) {
      next(error);
    }
  };
}
export default CustomerControler;
