require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());

console.log(process.env.MONGO_URL);

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);

async function main() {
    try{
        await mongoose.connect(process.env.MONGO_URL);

    app.listen(PORT, ()=>{
        console.log("Server is running on port 3000")
    });
    }
    catch(e){
        console.error("Failed to connect to the database", e);
    }
}

main();