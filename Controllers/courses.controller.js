import { validationResult } from "express-validator"


import { Courses } from "../Models/courses.model.js"
import httpStatusText from "../Utils/httpStatusText.js"
import asyncWrapper from "../Middleware/asyncWrapper.js"
import appError from "../Utils/appError.js"

const getCourses = asyncWrapper( async (req, res) => {
    const limit = req.query.limit ||3
    const page = req.query.page || 1
    let skip=(page - 1) * limit
    let courses = await Courses.find({},{"__v":false}).limit(limit).skip(skip)
    res.json({
        status: httpStatusText.SUCCESS, data: {
        courses,
    }})
})

const getCourse = asyncWrapper(
    async (req, res,next) => {
        let id = req.params.id
        console.log(id.length)
            let course = await Courses.findById(id, { "__v": false })
        if (!course) {
            const ErrorApp=appError.create("not found course", 404, httpStatusText.FAIL)
            return next(ErrorApp)  
            }
            res.json({
                status: httpStatusText.SUCCESS, data: {
                    course,
                }
            })
    }
)

const addCourese = asyncWrapper( async (req, res,next) => {
    const { title, price } = req.body
    //    get data from user 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const ErrorApp = appError.create(errors, 400, httpStatusText.FAIL)
        return next(ErrorApp)
    }
    const newCourse = new Courses({
        title,
        price,
    }
    )
    await newCourse.save()
    res.json({status:httpStatusText.SUCCESS,data:{course:newCourse}})
})
const updateCourse =asyncWrapper( async(req, res,next) => {
    let id = req.params.id
   let updatedCourse= await Courses.updateOne({_id:id},{$set:{...req.body}})
    res.status(200).json({ status: httpStatusText.SUCCESS, data: { course: updatedCourse } })

})
const deleteCourse =asyncWrapper( async (req, res) => {
    let id = req.params.id
        await Courses.deleteOne({_id:id})
        res.status(200).json({ status: httpStatusText.SUCCESS, data:null })
})
export default {
    getCourse,
    getCourses,
    addCourese,
    updateCourse,
    deleteCourse
}