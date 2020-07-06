const mongoose=require("mongoose");
const vote=require("../models/vote");

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/simplon-vote';
var ObjectId=mongoose.Types.ObjectId;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var controller={}
controller.liste= (req,res)=>{
   
       
    res.json(votes);

}
controller.ajout=(req,res)=>{
res.render("ajout");
}

controller.addvote=(req,res)=>{
 
}
controller.detailvote=(req,res)=>{
 
}
        

controller.updatevote=(req,res)=>{
       
}

controller.deletevote=(req,res)=>{
       
}
module.exports =controller;