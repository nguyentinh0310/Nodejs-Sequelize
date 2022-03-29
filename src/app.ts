import { Route } from "@core/interfaces";
import { errorMiddleware } from "@core/middlewares";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Logger } from "@core/utils";
const { Sequelize } = require("sequelize");


class App {
  public app: express.Application;
  public port: string | number;
  public production: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.production = process.env.NODE_ENV == "production" ? true : false;

    this.connectDatabase();
    this.initiallizeMiddleware();
    this.initiallizeViewEngine();
    this.initializeRoutes(routes);
    this.initializeErrorMiddleware();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening on port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private async connectDatabase() {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: "localhost",
        dialect: "mysql",
      }
    );
    try {
      // .authenticate () để kiểm tra xem kết nối
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.log("Unable to connect to the database:", error);
    }
  }

  private initiallizeViewEngine() {
    this.app.use(express.static("./src/public"));
    this.app.set("view engine", "ejs");
    this.app.set("views", "./src/views");
  }

  private initiallizeMiddleware() {
    if (this.production) {
      this.app.use(morgan("combined"));
    } else {
      this.app.use(morgan("dev"));
    }
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}
export default App;
