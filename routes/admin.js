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

module.exports({
    adminRouter: adminRouter
})