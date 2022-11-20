import { signIn, signUp, signOut } from "../ controllers/users.controller.js";
import { Router } from "express";

const usersRouter = Router()

usersRouter.post("/sign-in", signIn)
usersRouter.post("/sign-up", signUp)
usersRouter.post("/sign-out", signOut)

export default usersRouter;