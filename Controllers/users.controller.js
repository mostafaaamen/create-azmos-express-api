import dot from "dotenv"
dot.config()
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { genrateToken } from "../Utils/jwtToken.js"

import { Users } from "../Models/users.model.js"
import httpStatusText from "../Utils/httpStatusText.js"

import { validationUserSchema } from "../Middleware/validationsUsers.js"
import asyncWrapper from "../Middleware/asyncWrapper.js"
import appError from "../Utils/appError.js"

const getAllUsers = asyncWrapper(async (req, res) => {
    res.set({
        'X-Powered-By': 'azmos @app',
        'Content-Length': '123',
        'Azmos': 'handleRequest type data'
    })
    // console.log(req.headers)
    const limit = req.query.limit || 3
    const page = req.query.page || 1
    let skip = (page - 1) * limit
    let users = await Users.find({}, { "__v": false ,"password":false}).limit(limit).skip(skip)
    res.status(200).json({
        status: httpStatusText.SUCCESS, data: {
            users,
        }
    })
})

const register = asyncWrapper(async (req, res, next) => {
    res.set({
        'X-Powered-By': 'azmos @app',
        'Content-Length': '123',
        'Azmos': 'handleRequest type data'
    })
    const { firstName, lastName, email, password,role } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const ErrorApp = appError.create(errors, 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
    let oldUser =await Users.findOne({ email })
    console.log(oldUser)
    if (oldUser) {
        const ErrorApp = appError.create("user olread exists", 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
   const hashedPassword=await bcrypt.hash(password,10)
    const newUser = new Users({
        firstName, lastName, email, password: hashedPassword,role 
    })
    let token = await genrateToken({ email: newUser.email, id: newUser._id,role:newUser.role }, { expiresIn: "2m" })
    console.log("token", token)
    newUser.token = token
    
    await newUser.save()
    res.status(201).json({ status: httpStatusText.SUCCESS, data: { course: newUser } })
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const ErrorApp = appError.create(errors, 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
    const user = await Users.findOne({ email })
    if (!user) {
        const ErrorApp = appError.create("email not found", 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
    const matchedpassword = await bcrypt.compare(password, user.password)
    if (!matchedpassword) {
        const ErrorApp = appError.create("password is wrong", 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
    let token = await genrateToken({ email: user.email, id: user._id, role: user.role }, { expiresIn: "2m" })
    console.log(token)
        
    // console.log(user)
    if (user && matchedpassword) {
        res.status(200).json({
            status: httpStatusText.SUCCESS, data: {
                token
            }
        })
    } else {
        const ErrorApp = appError.create("somesting is wrong", 500, httpStatusText.FAIL)
        return next(ErrorApp)
    }

})


export default {
    getAllUsers,
    register,
    login,

}
// 1:12:31  time of