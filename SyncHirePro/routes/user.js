const {Router} = require('express');
const { UserModel } = require('../db');
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt');
const { JWT_SECRET } = require('../Middleware/userauth');


const userRouter = Router();

userRouter.post('/signup', async function (req, res , next ) {

    try {
        console.log('Request body ' , req.body);

        const {email, password , name } = req.body;
        if (!email || !password || !name) {
            return res.status (400).json({
                message: "All Fields Are Required"
            })
        }
        const sameuser = await UserModel.findOne({email});

        if(sameuser){
            return res.status (400).json({
                message: "User Already Exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        await UserModel.create ({
            email:email,
            password: hashedPassword, 
            name: name 
        });
        return res.json({
            message: "User Signed Up !"
        });

    }catch(err){
        console.error ('Error during signup ' , err)
        res.status(500).json ({
           message: "Server Error"
        })
    }

});

userRouter.post('/login', async function (req,res ,next ) {
    try {
        console.log("Request body ", req.body)

        const {email, password } = req.body ;

        if (!email || !password) {
            return res.status(400).json({message : "All Fields Are Required"})
        }
        const user = await UserModel.findOne({email})
        if (!user) {
            return res.status(401).json({message: "User Not Found "})
        }

        const passwordmatch = await bcrypt.compare(password,user.password)
        if (!passwordmatch){
            return res.status(401).json({message: "Incorrect Password"})
        }
        const token = jwt.sign({
            id: user._id.toString()
        },process.env.JWT_SECRET)
        res.json({
            token: token ,
            message: " Login Successful "
        })
    } catch (err) {
        console.error("Error during login",err)
        return res.status(500).json({message:" Server Error ! "})
    }
})

module.exports = userRouter