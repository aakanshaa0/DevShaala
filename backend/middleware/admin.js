const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    try{
        const verified = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.adminId = verified.id;
        next();
    }
    catch(e){
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}