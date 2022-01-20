import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ansureAdmin } from "./middleware/ansureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentsController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.post("/api/users", createUserController.handle);
router.post(
  "/api/tags",
  ensureAuthenticated,
  ansureAdmin,
  createTagController.handle
);
router.post(
  "/api/compliments",
  ensureAuthenticated,
  createComplimentsController.handle
);

export { router };
