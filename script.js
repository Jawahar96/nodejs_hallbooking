var mongoClient= require('mongodb').mongoClient
var url = ("mongodb://localhost:27017")

mongoClient.connect(url,function(err,db){
    if(err) throw err
    var dbmy =db.db("hallbooking")
    var mydata={name : "Rooms", noofseatsavalible : "30" , amenties_inroom : "AC ROOM",price_in1our : "300"}
    db.collection("rooms").insertOne(mydata,function(err,res){
        if(err) throw err
        console.log("Rooms is inserted");
        db.close()
    })
})
