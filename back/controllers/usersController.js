const mongoose=require("mongoose");
const User=require("../models/user");
/*
//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/simplon-vote';
var ObjectId=mongoose.Types.ObjectId;
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });*/

var controller = {}

controller.login = (req,res)=>{
  if( !req.body.email || !req.body.password ){
    return res.json({
      result: "error",
      message: "Donnée manquante"
    });
  } else {
    User.findOne({
      where: {email: req.body.email}
    }).then(user => {
      if (!user || (user.email !== req.body.email && user.password !== req.body.password) ){
        return res.json({
          result: "error",
          message: "Mauvais identifiants"
        });
      } else {
        res.json({
          result:"success",
          user
        });
      }
    })
  }
}
controller.signup=(req,res)=>{

}
module.exports = controller;