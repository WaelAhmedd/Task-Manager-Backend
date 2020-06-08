
const express =require('express')
const Task=require('../models/task')
const auth = require('../middleware/auth')
const router=express.Router()



router.post('/tasks',auth,async(req,res)=>{
    const task=new Task({
        ...req.body,
        owner:req.user._id
    })

    try{
        
        await task.save()
        res.send(task)
    }catch(e){
        res.status(404).send()
    }
 
//     task.save().then(()=>{
//             res.send(task)
//     }).catch((e)=>{
// res.status(400).send(e)
//     })
 })

 router.get('/tasks',auth,async(req,res)=>{

    const match ={}
    if(req.query.completed){
        match.completed = req.completed==='true'
    }
    try{
       // const tasks=await Task.find({owner:req.user._id})
       await req.user.populate({
           path:'tasks',
           match,
           options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip)
        }
       }).execPopulate() 
       res.send(req.user.tasks)
    }catch(e){
            res.status(500).send(e)
    }

    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)

    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id
    try{
       
 
      const task =await Task.findOne({_id,owner:req.user._id})  
      if(!task){
            return res.status(404).send()

        }
        res.send(task)

    }catch(e){
        res.status(500).send(e)
    }
  

})

router.patch('/tasks/id:',auth,async(req,res)=>{
    const updates=Object.keys(res.body)
    const allowedUpdates=['name','completed']
    const id=req.params.id
    try{
        const task =await Task.findOne({_id,owner:req.user._id})  
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()

    }catch(e){
res.status(500).send(e)
    }
})
module.exports=router