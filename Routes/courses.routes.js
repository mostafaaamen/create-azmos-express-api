import { Router } from "express";
import courseContrallers from "../Controllers/courses.controller.js";

import { validationSchema } from "../Middleware/validationsCourses.js";
import { verfiyToken } from "../Middleware/verfiyToken.js";
import { allowTo } from "../Middleware/allowTo.js";

import { userRoles } from "../Utils/user.rolers.js";

const router = Router();

router
  .route("/")
  .get(verfiyToken, allowTo(userRoles.ADMIN), courseContrallers.getCourses)
  .post(verfiyToken, validationSchema(), courseContrallers.addCourese);

router
  .route("/:id")
  .get(courseContrallers.getCourse)
  .patch(courseContrallers.updateCourse)
  .delete(
    verfiyToken,
    allowTo(userRoles.ADMIN, userRoles.MANGER),
    courseContrallers.deleteCourse
  );

export default router;
