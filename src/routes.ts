import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ansureAdmin } from "./middleware/ansureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();

router.post("/api/users", createUserController.handle);
router.post("/api/tags", ansureAdmin, createTagController.handle);
router.post("/login", authenticateUserController.handle);

export { router };
