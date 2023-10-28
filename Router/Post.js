const App = require('express').Router()
const Data = require('../Database/Data')
const { authenticateToken, isAdmin } = require('./../Database/Token');
App.post('/', authenticateToken, isAdmin,async(req,res)=>{
const Post = await new Data({
         name:{
            n1: req.body.n1,
            n2: req.body.n2,
            n3: req.body.n3,
            n4: req.body.n4
        },
        about:{
            aurl: req.body.aurl,
            aurl_id: req.body.aurl_id,
            def: req.body.def
        }
})

   try {
    const Save = await Post.save()
    await res.status(200).json(Save)
   } catch (error) {
    await res.status(400).json(error)
   }
   
})

module.exports=App