const mongoose=require("mongoose");
const Vote = require("../models/vote");
const User=require('../models/user');
var ObjectId=mongoose.Types.ObjectId;
//Set up default mongoose connection
// var mongoDB = 'mongodb://localhost:27017/simplon-vote';
// var ObjectId=mongoose.Types.ObjectId;
// mongoose.connect(mongoDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

var controller={}

/** 
 * List all votes
 * @name list
 * @function
 * @returns {json} votes
 */
controller.list = async (req,res) => {
var votes=await Vote.find({}).populate("createdBy")
var user=await User.findOne({_id:"5f03355d220832635062c9f1"});

  try {
    res.render("pages/sujet",{votes:votes,title:"application votes",user:user})
  } catch (error) {
    res.status(400).json({result: "error"})
  }
  
}

/** add One vote
 * @name add
 * @function
 * @param {string} subject
 * @param {integer} quota
 * @param {array} choices
 * @param {integer} nbVote
 * @param {OjectId} createdBy
 * @param {array} participants
 * @param {string} status ['created', 'inprogress', 'finished']
 * @returns {json} vote
 */
controller.add = async (req,res) => {
  var {subject, quota, choices, nbVote, createdBy, participants, status} = req.body
  choices=choices.split(";");
  try {
    const vote = await Vote.create({
      _id:new ObjectId(),
      subject,
      quota,
      choices,
      nbVote,
      createdBy,
      participants,
      status
    })
    res.redirect("/")
  } catch (error) {
    res.status(400).json({result:error})
  }
}

/** show one vote
 * @name show
 * @function
 * @returns {json} vote
 */
controller.show = async (req,res) => {
  const {id} = req.params
  try {
    const vote = await Vote.findById(id)
    if (!vote) return res.status(400).json({result: "error", message: "vote non trouvé"})
    res.render("/detail")
  } catch (error) {
    res.status(400).json({result: "error", message: error})
  }
}

/** update one vote
 * @name add
 * @function
 * @param {string} subject
 * @param {integer} quota
 * @param {array} choices
 * @param {integer} nbVote
 * @param {OjectId} createdBy
 * @param {array} participants
 * @param {string} status ['created', 'inprogress', 'finished']
 * @returns {json} vote
 */
controller.update =  (req,res) => {
  const { id } = req.params
  const {subject, quota, choices, nbVote, createdBy, participants, status} = req.body

  try {
    Vote.findOne({_id:id}).then(vote=>{
     var p= vote.participants;
   
     p.push(ObjectId("5f03355d220832635062c9f1"));
     vote.participants=p;
      vote.save();
      res.sendStatus(200);
    })
  } catch (error) {
    res.status(400).json({result:"error"})
  }
}

/** delete one vote
 * @name delete
 */
controller.delete = async (req, res) => {
  try {
    const { id } = req.params
    await Vote.findByIdAndRemove(id)
  
    res.sendStatus(200);
  } catch (error) { console.log(error);
    res.status(400).json({result:"error"})
  }
}




// controller.list = async (req,res) => {
//     const votes = await Vote.find({})
//     res.status(200).json({
//         result: 
//         votes
//     })
// }
 controller.ajout = async (req,res) => {
   res.status(201).json({
     user
   })
 }

// controller.addvote = (req,res)=>{
 
// }
// controller.detailvote=(req,res)=>{
 
// }
        

// controller.updatevote=(req,res)=>{
       
// }

// controller.deletevote=(req,res)=>{
       
// }

module.exports =controller;