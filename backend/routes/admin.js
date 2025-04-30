const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const  { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middleware/admin");


adminRouter.post("/signup", async function(req, res) {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(100),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        return res.json({
            message: "Incorrect Input Format",
            error: parsedDataWithSuccess.error
        })
    }

    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        })
    }
    catch(e){
        return res.json({
            message: "Admin already exists"
        })
    }
    res.json({
        message: "You are signed up"
    })
})

adminRouter.post("/signin", async function(req, res) {
    const requiredBody = z.object({
        email: z.string(),
        password: z.string()
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        return res.json({
            message: "Incorrect Input Format",
            error: parsedDataWithSuccess.error
        })
    }

    const {email, password} = req.body;
    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const admin = await adminModel.findOne({
        email: email
    });

    if(!admin){
        return res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if(passwordMatch){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);
        res.json({
            token: token
        })
    }
        // Do cookie logic
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const requiredBody = z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        imageUrl: z.string().url(),
        price: z.number().positive(),
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess){
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        })
    }

    const { title, description, imageUrl, price } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.status(201).json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const requiredBody = z.object({
        courseId: z.string().min(5),
        title: z.string().min(3).optional(),
        description: z.string().min(5).optional(),
        imageUrl: z.string().url().min(5).optional(),
        price: z.number().positive().optional(),
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess){
        return res.json({
            message: "Incorrect data format",
            error: parseDataWithSuccess.error,
        })
    }

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.findOne({
        _id: courseId,
        creatorId: adminId
    })

    if(!course){
        return res.status(404).json({
            message: "Course not found!"
        })
    }

    //watch creating a web3 saas in 6 hours this video on yt to know how to upload images
    await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, 
    {
        title: title || course.title, 
        description: description || course.description, 
        imageUrl: imageUrl || course.imageUrl, 
        price: price || course.price
    })

    res.status(200).json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}