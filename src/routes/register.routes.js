import { Router } from "express";
import { addRegister } from "../ controllers/register.controller.js";

const registerRouter = Router();

registerRouter.post("/addRegister", addRegister)

export default registerRouter;