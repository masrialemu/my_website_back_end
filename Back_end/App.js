const express = require('express')
const mongo = require('mongoose')
const app = express()
app.use(express.json())
const cors = require('cors');
app.use(cors());

require('dotenv/config')

const Portfolio = require('./Router/PostPortfolio')
const getPortfolio = require('./Router/GetPortfolio')
const Post = require('./Router/Post')
const Get = require('./Router/Get')
const Mail = require('./Router/Fead')
const Signup = require('./User/Register')
const Login = require('./User/Login')
const PostSkill=require('./Skill/PostSkill')
const GetSkill=require('./Skill/GetSkill')
const DeleteSkill=require('./Skill/DeleteSkill')
const PostInfo=require('./Info/PostInfo')
const GetInfo=require('./Info/GetInfo')
const DeleteInfo=require('./Info/DeleteInfo')
const DeletePortfolio=require('./Router/DeletePortfolio')
mongo.connect(process.env.Pass,{useNewUrlParser:true}).then(console.log('db is conncted'))
const port = process.env.PORT || 5001; // Use environment variable or port 5001


app.use('/get',GetInfo)
app.use('/post',PostInfo)
app.use('/delete',DeleteInfo)
app.use('/login',Login)
app.use('/signup',Signup)
app.use('/post',PostSkill)
app.use('/get',GetSkill)
app.use('/delete',DeleteSkill)
app.use('/delete',DeletePortfolio)
app.use('/post',Portfolio)
app.use('/get',getPortfolio)
app.use('/post',Post)
app.use('/get',Get)
app.use("/mail",Mail)

app.listen(port,(req,res)=>{
    console.log(`The port is working now ${port}`)
})