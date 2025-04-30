const { Router } = require("express");
const userRouter = Router();

const { userModel, purchaseModel, courseModel } = require("../db");

const jwt = require("jsonwebtoken");

const  { JWT_USER_PASSWORD } = require("../config");

const { userMiddleware } = require("../middleware/user");

const z = require("zod");

const bcrypt = require("bcrypt");

userRouter.post("/signup", async function(req, res) {    
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(3)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect message format",
            error: parsedDataWithSuccess.error
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5);
    try{
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        })   
    }
    catch(e){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    res.json({
        message: "Signup succeeded"
    }) 
})

userRouter.post("/signin",async function(req, res) {
    const requiredBody = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    
    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Invalid input format",
            error: parsedDataWithSuccess.error
        })
    }
    const { email, password } = req.body;

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email
    });

    if (!user){
        return res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if(passwordMatch){
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD)

        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId: userId,
    });

    if(!purchases){
        return res.status(404).json({
            message: "No purchase found"
        })
    }

    // If purchases are found, extract the courseIds from the found purchases
    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    // Find all course details associated with the courseIds
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}