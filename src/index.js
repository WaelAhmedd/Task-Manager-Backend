// \Users\WaelAhmed\mongoDp\bin\mongod.exe --dbpath=\Users\WaelAhmed\mongodbData
//npm run dev
const express =require('express')
require('./db/mongoose')
const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')


const app = express()
const port =process.env.port 

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,()=>{
    console.log('server'+port)
})