const mongoose = require("mongoose");
const Vote = require("../models/vote");
const User = require("../models/user");
const UserVote = require("../models/user_vote");
const validator = require('validator');
var ObjectId=mongoose.Types.ObjectId;
//Set up default mongoose connection
// var mongoDB = 'mongodb://localhost:27017/simplon-vote';
// var ObjectId=mongoose.Types.ObjectId;
// mongoose.connect(mongoDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

var controller = {}

/** 
 * List all votes
 * @name list
 * @function
 * @returns {json} votes
 */
controller.list = async (req, res) => {
  var votes=await Vote.find({}).populate("createdBy")
var user=await User.findOne({_id:"5f03355d220832635062c9f1"});
  try {
    res.render("index", {
      votes: votes,
      title: "application votes",
      user:user
    })
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}

/** add one user
 * @name addUser
 * @fonction
 * @param {string} pseudo
 * @param {string} email
 * @param {string} mot de passe
 */

controller.addUser = async (req, res) => {
  User.create({
    login: validator.escape(req.body.pseudo),
    email: validator.normalizeEmail(req.body.email),
    password: req.body.password
  }).then(res.redirect('/'))
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

controller.add = async (req, res) => {
  var {
    subject,
    quota,
    choices,
    nbVote,
    createdBy,
    participants,
    status
  } = req.body
 
  try { 
    Vote.create({
      _id:new ObjectId(),
      subject,
      quota,
      choices,
      nbVote,
      createdBy,
      participants,
      status
    }).then(msg=>{
    res.sendStatus(200)})
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}
controller.visulogin = async (req,res) => {
  res.render('./index.ejs', {title: "login"})
}
controller.dashboard = async (req,res) => {
  var votes=await Vote.find({}).populate("createdBy")
  var user=await User.findOne({_id:"5f03355d220832635062c9f1"});
  res.render('./sujet.ejs' , {
    votes:votes,
    user:user,
    title: "sujet"
  })
}

controller.login = async (req,res) => {
  const {email, password} = req.body
  if( !email || !password ){
    req.session.msgFlash = {type: "error", message: "Identifiants invalide"}
    res.redirect('/login')
  } else {
    try {
      const user = await User.findOne({ email: email })
    if (!user || (user.email !== email && user.password !== password) ){
      req.session.msgFlash = {type: "error", message: "Identifiants invalide"}
      res.redirect('/login')
    } else {
      req.session.user = user // use session for user connected
      console.log(req.session)
      res.redirect('/dashboard')
    }
    } catch (error) {
      req.session.msgFlash = {type: "error", message: "Identifiants invalide"}
      res.redirect('/login',)
    }
  }
}

controller.logout = async (req,res) => {
  req.session = null
  res.redirect('/')
}

/** show one vote
 * @name show
 * @function
 * @returns {json} vote
 */
controller.show = async (req, res) => {
  const {
    id
  } = req.params
  try {
 const vote = await Vote.findById(id)
    if (!vote) return res.status(400).json({
      result: "error",
      message: "vote non trouvé"
    })    
   
   // const monchoix=await UserVote.findOne({vote:id,user:req.session.user._id});
 const monchoix= await UserVote.aggregate([
    {
      $match: {
      vote: new ObjectId(vote._id), 
        user: new ObjectId(req.session.user._id)
      }
    }
  ]);

    res.render("choix",{vote:vote,monchoix:monchoix[0]})

  } catch (error) {
    res.status(400).json({
      result: "error",
      message: error
    })
  }
}
controller.vote=async (req,res)=>{
var currentVote=await Vote.findOne({_id:req.params.id});
var liste_choix=currentVote.choices;
console.log(req.body)
UserVote.create({
  _id:new ObjectId(),
  user:req.session.user._id,
  vote:req.body.voteid,
  choix:liste_choix.indexOf(req.body.choix)
}).then((vote)=>{
  res.redirect("/votes/"+req.params.id);
})
}

controller.inscription = async (req, res) => {
  try {
    res.render("inscription", {
      title: " inscription"
    })
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}

/** Update one vote
 * @name update
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

  try {
    Vote.findOne({_id:id}).then(vote=>{
     var p= vote.participants;
   
     p.push(ObjectId("5f03355d220832635062c9f1"));
     if(p.length==vote.quota)vote.status="inprogress"
     vote.participants=p;
      vote.save();
      res.sendStatus(200);
    })
  } catch (error) {
    res.status(400).json({result:"error"})
  }
}

/** Delete one vote
 * @name delete
 */
controller.delete = async (req, res) => {
  try {
    const {
      id
    } = req.params
    await Vote.findByIdAndRemove(id)
 
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}




// controller.list = async (req,res) => {
//     const votes = await Vote.find({})
//     res.status(200).json({
//         result: 
//         votes
//     })
// }
controller.ajout = async (req, res) => {
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

module.exports = controller;