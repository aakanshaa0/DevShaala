const { Router } = require("express");
const adminRouter = Router();

adminRouter.post('/login', function(req, res){
    res.json({
        message: "You are signed in"
    })
})

adminRouter.post('/signup', function(req, res){
    res.json({
        message: "You are signed up"
    })
})

adminRouter.post('/course', function(req, res){
    res.json({
        message: "Admin can create course"
    })
})

adminRouter.put('/course', function(req, res){
    res.json({
        message: "Admin can edit course"
    })
})

adminRouter.get('/course/bulk', function(req, res){
    res.json({
        message: "Admin can see all the courses he has created"
    })
})

module.exports = {
    adminRouter: adminRouter
}