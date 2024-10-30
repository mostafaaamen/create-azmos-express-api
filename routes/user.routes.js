import { Router } from "express"
import usersContrallers from "../controllers/users.controller.js"
import { validationUserSchema } from "../middleware/validationsUsers.js"
import { verfiyToken } from "../middleware/verfiyToken.js"
const router = Router()



router.route("/")
    .get(
        verfiyToken,
        usersContrallers.getAllUsers)

router.route("/register")
    .post(validationUserSchema(),usersContrallers.register)

router.route("/login")
    .post(validationUserSchema(),usersContrallers.login)





export default router