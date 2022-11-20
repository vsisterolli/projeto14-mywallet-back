import { Router } from "express";
import { addRegister, deleteRegister, getRegister, updateRegister } from "../ controllers/register.controller.js";
import checkUser from "../middlewares/checkUser.middleware.js";

const registerRouter = Router();

registerRouter.post("/register", checkUser, addRegister)
registerRouter.get("/register", checkUser, getRegister)
registerRouter.delete("/register", checkUser, deleteRegister)
registerRouter.put("/register", checkUser, updateRegister)

export default registerRouter;