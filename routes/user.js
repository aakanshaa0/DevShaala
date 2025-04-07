const { Router } = require("express");        
const userRouter = Router();

const {userModel} = require('../db');
const {userMiddleware} = require('../middleware/user');
const {JWT_USER_PASSWORD} = require('../config');

userRouter.post("/signup", async function(req, res){
    const {email, password, firstName, lastName} = req.body;
    try{
        const hashedPassword = bcrypt.hash(password, 5);
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "Signup endpoint"
        })
    }
    catch(e){
        res.status(403).json({
            message: "Error signing up"
        })
    }
})

userRouter.post("/signin", async function(req, res){
    const {email, password, firstName, lastName} = req.body;
    const user = await userModule.find({
        email: email
    })
    if(!user){
        res.json({
            message: "User doesn't exist"
        })
        return;
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if(passwordMatched){
        const token = jwt.sign({
            id:user._id
        }, JWT_USER_PASSWORD);
        res.json({
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})


userRouter.get("/purchases", userMiddleware, function(req, res){
    res.json({
        message: "Signup endpoint"
    })
})

module.exports = {   
    userRouter: userRouter
}