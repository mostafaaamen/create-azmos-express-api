import { Router } from "express"
import usersContrallers from "../Controllers/users.controller.js"
import { validationUserSchema } from "../Middleware/validationsUsers.js"
import { verfiyToken } from "../Middleware/verfiyToken.js"
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
