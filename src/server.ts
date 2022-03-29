import "dotenv/config";
import AuthRoute from "@modules/auth/auth.route";
import { CustomerRoute } from "@modules/customer";
import { ProjectRoute } from "@modules/project";
import { UsersRoute } from "@modules/user";
import App from "./app";

const routes = [
  new UsersRoute(),
  new AuthRoute(),
  new CustomerRoute(),
  new ProjectRoute(),
];
const app = new App(routes);

app.listen();
