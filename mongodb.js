const mongodb=require('mongodb')
const MongoClint=mongodb.MongoClient
const ObjectID =mongodb.ObjectID
const t=new ObjectID()
console.log(t)
const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClint.connect(connectionURL,{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>{
if(error){
return console.log('unable to connect to database')
}
const db=client.db(databaseName)

db.collection('tasks').updateMany({
    completed:false
},{
    $set:{
        completed:true
    }
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
console.log(error)
})
/*db.collection('users').insertOne({
    name:'Wael',
    age:22
})*/
/*
db.collection('users').insertMany([
    {
        name:'ahmed',
        age:23
    },
    {
        name:'gemy',
        age:21
    }
],(error,result)=>{
     if(error){
         return console.log('unable to insert')
     }
     console.log(result.ops)
})
*/
/*
db.collection('tasks').insertMany([
    {
        description:'clean the house',
        completed:true

    },{
        description:'buy new knife',
        completed:false

    },
    {
        description:"pot plants",
        completed:true
    }
],(error,result)=>{
    if(error){
        return console.log('unable to insert')
    }
    
    console.log(result.ops)

})

*/
/*
db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
    if(error){
        return console.log('unable to get tasks')
    }
    console.log(tasks)
})*/
})