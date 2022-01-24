import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiverController } from "./controllers/ListUserReceiverController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSenderController } from "./controllers/ListUserSenderController";
import { ansureAdmin } from "./middleware/ansureAdmin";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";

const router = Router();

const authenticateUserController = new AuthenticateUserController();
const createUserController = new CreateUserController();

const createTagController = new CreateTagController();
const createComplimentsController = new CreateComplimentController();

const listUserSendComplimentsController = new ListUserSenderController();
const listUserReceiveComplimentsControler = new ListUserReceiverController();
const listTagsController = new ListTagsController();
const listUserController = new ListUsersController();

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

router.get(
  "/api/user/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/api/user/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsControler.handle
);

router.get("/api/tags", ensureAuthenticated, listTagsController.handle);

router.get("/api/users", ensureAuthenticated, listUserController.handle);

export { router };
