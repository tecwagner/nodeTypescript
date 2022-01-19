import { Router } from "express";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ansureAdmin } from "./middleware/ansureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/api/users", createUserController.handle);
router.post("/api/tags", ansureAdmin, createTagController.handle);

export { router };
