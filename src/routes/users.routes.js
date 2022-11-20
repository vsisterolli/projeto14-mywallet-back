import { signIn, signUp } from "../ controllers/users.controller.js";
import { Router } from "express";

const usersRouter = Router()

usersRouter.post("/sign-in", signIn)
usersRouter.post("/sign-up", signUp)

export default usersRouter;