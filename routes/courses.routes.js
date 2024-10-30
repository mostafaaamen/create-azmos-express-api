import { Router } from "express"
import courseContrallers from "../controllers/courses.controller.js"

import { validationSchema } from "../middleware/validationsCourses.js"
import { verfiyToken } from "../middleware/verfiyToken.js"
import { allowTo }from "../middleware/allowTo.js"

import { userRoles } from "../utils/user.rolers.js"


const router=Router()

router.route("/")
    .get(verfiyToken, allowTo(userRoles.ADMIN),courseContrallers.getCourses)
    .post(verfiyToken,validationSchema() , courseContrallers.addCourese
)
    
router.route("/:id")
    .get(courseContrallers.getCourse)
    .patch(courseContrallers.updateCourse)
    .delete(verfiyToken,allowTo(userRoles.ADMIN,userRoles.MANGER), courseContrallers.deleteCourse)



export default router