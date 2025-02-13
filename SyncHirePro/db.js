require('dotenv').config()
const mongoose = require ('mongoose')
const {string} = require ('zod')

mongoose.connect(process.env.MONGO_URL)

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
    
    name: {type: String , required: true},
    email: {type : String , required: true , unique : true },
    password : {type : String, required : true }
    
});

const UserModel = mongoose.model('users', User)
module.exports = {
    UserModel : UserModel 
}