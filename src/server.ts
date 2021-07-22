import express, { request, response } from "express";
import "reflect-metadata";
import { router } from "./routes";

import "./database";

const app = express();
app.use(express.json());
app.use(router);

app.listen(3000, () => console.log("Runnig server port 3000"));
