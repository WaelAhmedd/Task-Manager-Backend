const mongoose=require('mongoose')

const connectionURL2='mongodb://127.0.0.1:27017/task-manager-api'
const databaseName='task-manager'
mongoose.connect(connectionURL2,{useNewUrlParser:true,useUnifiedTopology: 
    true,useCreateIndex:true})



