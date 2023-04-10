const express =require('express')

const app=express()

const dotenv =require('dotenv').config


const mongodb = require('mongodb')

const mongoClient =mongodb.MongoClient



// const DB = process.env.DB

const PORT =process.env.PORT || 8080


app.use(express.json())

app.get('/',function(req,res){
    res.json({message :" Welcome To HALL BOOKING ROOM API "})

    app.post('/rooms',async function(req,res){
        try {
            const connection =await mongoClient.connect(URL)
            const db =connection.db(DB)
            let room =await db.collection("rooms").insertOne(req.body)

            res.json(room)

            await  connection.close()
            res.json({message :"Data is inserted"})
        }catch(error){
            console.log(error)
          res.status(500).json({message :"Something went wrong in your application"})
        }
    })
})
app.get('/customer', async function(req,res){
    try {
        const connection = await mongoClient.connect(URL);
        const db = connection.db(DB);
        let customers = await db.collection("customers").find().toArray()
        await connection.close()
        res.json(customers)
        console.log(res)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong"})
    }
})

app.post('/createaroom', async function(req,res){
    try{
    const connection =await mongoClient.connect(URL)
    const db =connection.db(DB)
    let customers =await db.collection("customers").insertOne({_id :req.params.id}).toArray()
    res.json(customers)
    await connection.close()

    res.json({message : " Customer Room inserted"})
    }catch(error){
     res.status(500).json({message : "something went wrong in your application"})
    }

   
})

app.get('/bookingrooms', async function(req,res){
    try{
        
        const connection =await mongoClient.connect(URL);
        const db=connection.db(DB)
        let bookingrooms =await db.collection("customerroom").aggregate(pipeline).toArray()
        await connection.close();
        res.json(bookingrooms)
    }catch(error){
        console.log(error)
        res.status(500).json({message : "something went wrong"})
    }
    }

)
    
    


app.listen(PORT ,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`);
})
