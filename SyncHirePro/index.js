require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require ('./routes/user')
const {default: mongoose} = require('mongoose')


app.use(express.json())


app.use('/user',userRouter)
async function main() {

  await mongoose.connect(process.env.MONGO_URL)

    .then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB', err));
    
    app.listen(3000)
    
}
main()
