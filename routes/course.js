const { Router } = require('express');
const {courseRouter} = Router();

courseRouter.get('/courses', function(req, res){
    res.json({
        message : "These are all the courses"
    })
})

courseRouter.get('/purchases', function(req, res){
    res.json({
        message : "These are all the courses you purchased"
    })
})

courseRouter.post('/purchase', function(req, res){
    res.json({
        message : "You have successfully purchased this course"
    })
})

module.exports({
    courseRouter: courseRouter
})