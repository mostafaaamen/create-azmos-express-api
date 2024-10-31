import jwt from "jsonwebtoken"
import appError from "../Utils/appError.js"
import httpStatusText from "../Utils/httpStatusText.js"


export const verfiyToken = (req, res, next) => {
    let tokenHeader = req.headers["a-auth-token"] || req.headers["A-Auth-Token"]
    if (!tokenHeader) {
        let errorApp = appError.create("this resourse is not avalibe without login", 404, httpStatusText.FAIL)
        next(errorApp)
    }
    let token = tokenHeader.split(" ")[1]
    try {

        let currentUser = jwt.verify(token, process.env.JSONTOKENSEC)
        console.log(currentUser)
        req.currentUser=currentUser
        next()
    } catch (error) {
        let errorApp = appError.create(error, 404, httpStatusText.ERROR)
        errorApp.message.message = "invalid token try login"
        next(errorApp)
    }
}
