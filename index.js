const mongoose = require('mongoose');
const express = require('express');
const app = express();

const {userRouter} = require('./routes/user');
const {adminRouter} = require('./routes/admin');
const {courseRouter} = require('./routes/course');

app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main(){
    await mongoose.connect("mongodb+srv://aakansha:aakansha12@cluster0.qhsgoyw.mongodb.net/DevShaala");
    app.listen(3000);
}

main();