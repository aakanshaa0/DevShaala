const { Router } = require('express')
const courseRouter = Router();

courseRouter.get('/preview', function(req, res){
    res.json({
        message : "These are all the courses available"
    })
})

courseRouter.post('/purchase', function(req, res){
    res.json({
        message : "You have successfully purchased this course"
    })
})

module.exports = {
    courseRouter: courseRouter
}