import { body } from "express-validator"

export const validationUserSchema = () => {
    return [

        body("email")
            .notEmpty().withMessage("email is Required"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ max: 20, min: 8 }).withMessage(`min : 8 , max : 20`)

    ]
}