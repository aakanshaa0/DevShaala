const { Router } = require("express");
const courseRouter = Router();

const { purchaseModel, courseModel } = require("../db")

const { userMiddleware } = require("../middleware/user");

courseRouter.post("/purchase", userMiddleware, async function(req, res) {
    const userId = req.userId;
    const courseId = req.body.courseId;

    if(!courseId){
        return res.status(400).json({
            message: "Please provide a courseId"
        })
    }
    
    const existingPurchase = await purchaseModel.find({
        userId: userId,
        courseId: courseId
    })
    
    if(!existingPurchase){
        return res.status(400).json({
            message: "You have already purchased this course"
        })
    }

    //feature to be added - should check that the user has actually paid the price
    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.status(200).json({
        message: "You have successfully bought the course"
    })
})

courseRouter.get("/preview", async function(req, res) {
    
    const courses = await courseModel.find({});

    res.status(200).json({
        courses: courses,
    })
})

module.exports = {
    courseRouter: courseRouter
}