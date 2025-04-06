const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    email : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String}
})

const adminSchema = new Schema({
    email : {type: String, unique: true, required: true},
    password : {type: String, required: true},
    firstName : {type: String, required: true},
    lastName : {type: String}
})

const courseSchema = new Schema({
    title: {type: String, required: true},
    description : {type: String, required: true},
    price : {type: Number, required: true},
    imageUrl : {type: String, required: true},
    creatorId: {type: ObjectId, required: true}
})

const purchaseSchema = new Schema({
    courseId : {type: ObjectId, required: true},
    userId : {type: ObjectId, required: true}
})

const UserModel = mongoose.model('users', userSchema);
const AdminModel = mongoose.model('admins', adminSchema);
const CourseModel = mongoose.model('courses', courseSchema);
const PurchaseModel = mongoose.model('purchases', purchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
}