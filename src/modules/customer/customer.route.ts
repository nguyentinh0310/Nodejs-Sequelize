import { Route } from "@core/interfaces";
import { authMiddleware, validationMiddleware } from "@core/middlewares";
import { Router } from "express";
import CustomerControler from "./customer.controller";
import CustomerDto from "./dtos/customer.dtos";



export default class CustomerRoute implements Route {
  public path = "/api/customers";
  public router = Router();

  public customerController = new CustomerControler();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.customerController.getAllCustomer);
    this.router.get(this.path + '/:id', this.customerController.getCustomerById);
    this.router.post(this.path, validationMiddleware(CustomerDto, true), this.customerController.createCustomer);
    this.router.put(this.path + '/:id', validationMiddleware(CustomerDto, true), authMiddleware, this.customerController.updateCustomer);
    this.router.delete(this.path + '/:id', authMiddleware, this.customerController.deleteCustomer);
  }
}
