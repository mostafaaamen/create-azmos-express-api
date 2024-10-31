import { body } from "express-validator"

export const validationSchema = () => {
    return [
        
            body("title")
                .notEmpty().withMessage("this value is Required"),
            body("price")
                .notEmpty().withMessage("price is required")
                .isLength({ max: 5, min: 3 }).withMessage("max is 5 min is 3")
        
    ]
}
