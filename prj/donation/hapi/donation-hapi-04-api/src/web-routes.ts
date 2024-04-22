import { accountsController } from "./controllers/accounts-controller.js";
import { donationsController } from "./controllers/donations-controller.js";

export const webRoutes = [
  { method: "GET" as const, path: "/", config: accountsController.index },
  { method: "GET" as const, path: "/signup", config: accountsController.showSignup },
  { method: "GET" as const, path: "/login", config: accountsController.showLogin },
  { method: "GET" as const, path: "/logout", config: accountsController.logout },
  { method: "POST" as const, path: "/register", config: accountsController.signup },
  { method: "POST" as const, path: "/authenticate", config: accountsController.login },

  { method: "GET" as const, path: "/donate", config: donationsController.index },
  { method: "POST" as const, path: "/donate", config: donationsController.donate },
  { method: "GET" as const, path: "/report", config: donationsController.report },

  {
    method: "GET" as const,
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false as const },
  },
];
