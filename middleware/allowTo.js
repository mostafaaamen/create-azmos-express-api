import appError from "../utils/appError.js"
export const allowTo = (...roles) => {
    console.log("roles", roles)
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            return next(appError.create("this role is not authrized", 401))
        }
        next()
    }
}