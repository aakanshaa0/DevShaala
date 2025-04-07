const { Router } = require("express");
const adminRouter = Router();

const {adminModel, CourseModel} = require("../db");
const {adminMiddleware} = require("../middleware/admin");
const {JWT_ADMIN_PASSWORD} = require('../config');

adminRouter.post('/signin', async function(req, res){
    //const parsedDataWithSuccess = adminModel.pick({email: true, password: true}).safeParse(req.body);
    /*if(!parsedDataWithSucceess.success){
        res.json({
            message:"Incorrect Format",
            error: parsedDataWithSuccess.error
        })
    }*/
    const email = req.body.email;
    const password = req.body.password;

    const admin = await adminModel.find({
        email: email
    })
    if(!admin){
        res.json({
            message: "User does not exist"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
        const token = jwt.sign({
            id: admin._id.toString()
        }, JWT_SECRET)
        res.json({
            message: "You are signed in",
            token: token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

adminRouter.post('/signup', async function(req, res){
    //const parsedDataWithSuccess = adminModel.safeParse(req.body);
    /*if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect Format",
            error: parsedDataWithSuccess.error
        })
    }*/
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const hashedPassword = await bcrypt.hash(password, 5);
        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
            email: email
        })
        res.json({
            message: "You are signed up"
        })
    }
    catch(e){
        res.status(403).json({
            message: "User already exists"
        })
    }
});
adminRouter.post('/course', adminMiddleware, async function(req, res){
    const {title, description, price, imageUrl} = req.body;
    const course = await courseModel.create({
        title: title,
        description, description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async function(req, res){
    const {title, description, price, imageUrl, courseId} = req.body;
    const course = await courseModel.fineOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description, description,
        price: price,
        imageUrl: imageUrl
    })
    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get('/course/bulk', adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const course = await CourseModel.find({
        creatorId: adminId
    })

    res.json({
        message: "All courses of this user are here"
    })
})

module.exports = {
    adminRouter: adminRouter
}