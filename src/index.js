import express from "express";
import usersRouter from "./routes/users.routes.js";
import registerRouter from "./routes/register.routes.js";
import cors from "cors";

const app = express()
const router = express.Router()

router.use(usersRouter)
router.use(registerRouter)

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(5000)