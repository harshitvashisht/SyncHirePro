require('dotenv').config()
const jwt = require ('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

function userMiddleware (req, res , next ){
    const token = req.headers.authorization ; 
    const decoded = jwt.verify(token,JWT_SECRET)

    if (decoded){
        req.userId = decoded.id ;
        next()
    }else{
        req.status(403).json({
            message: " Not Signed In "
        })
    }
}
module.exports = {
    userMiddleware: userMiddleware,
    JWT_SECRET
}