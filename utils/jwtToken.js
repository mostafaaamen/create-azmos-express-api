import jwt from "jsonwebtoken"
export const genrateToken=async (payload, time)=> {
    const token = await jwt.sign(payload, process.env.JSONTOKENSEC, time)
    return token
}