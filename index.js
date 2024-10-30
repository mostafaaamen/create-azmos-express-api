import dot from "dotenv"
dot.config()
import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import coursesRoutes from "./routes/courses.routes.js"
import usersRoutes from "./routes/user.routes.js"
import httpStatusText from "./utils/httpStatusText.js";
const app = express()

app.use(express.json())

const URL = process.env.MONGOCONNENTIONS
const PORT =process.env.PORT

mongoose.connect(URL).then(() => {
    console.log("mongodb connected database")
}).catch(() => {
    console.log("Error to connect database mongoose ")
})


app.use(cors())
app.use("/api/users", usersRoutes)
app.use("/api/courses", coursesRoutes);
// after all routes
app.all("*", (req, res, next) => {
    return res.status(404).json({
        status: httpStatusText. ERROR, message: "this resource not found"
    })
})
// global error handler 
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500 ,data:null})
})
app.listen(PORT, () => {
  console.log(`server open on http://localhost:${PORT}`);
});