const mongoose = require("mongoose");
const Vote = require("../models/vote");
const User = require("../models/user");
const validator = require('validator');

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
  const votes = await Vote.find({})
  try {
    res.render("index", {
      votes: votes,
      title: "application votes"
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
    pseudo: validator.escape(req.body.pseudo),
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
  const {
    subject,
    quota,
    choices,
    nbVote,
    createdBy,
    participants,
    status
  } = req.body
  try {
    const vote = await Vote.create({
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
    res.status(400).json({
      result: "error"
    })
  }
}
controller.visulogin = async (req,res) => {
  res.render('./index.ejs', {title: "login"})
}
controller.dashboard = async (req,res) => {
  res.render('./dashboard.ejs' , {
    title: "sujet"
  })
}

controller.login = async (req,res) => {
  const {email, password} = req.body
  if( !email || !password ){
    req.session.msgFlash = {type: "danger", message: "Donnée manquante"}
    res.redirect('/login')
  } else {
    try {
      const user = await User.findOne({ email: email })
    if (!user || (user.email !== email && user.password !== password) ){
      req.session.msgFlash = {type: "danger", message: "Identifiants invalide"}
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
    res.render("/detail")
  } catch (error) {
    res.status(400).json({
      result: "error",
      message: error
    })
  }
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
controller.update = async (req, res) => {
  const {
    id
  } = req.params
  const {
    subject,
    quota,
    choices,
    nbVote,
    createdBy,
    participants,
    status
  } = req.body
  try {
    const vote = await Vote.findByIdAndUpdate(id, {
      subject,
      quota,
      choices,
      nbVote,
      createdBy,
      participants,
      status
    }).setOptions({
      new: true, // for get the updated vote
      omitUndefined: true
    })
    res.redirect("/").json({
      result: "success",
      message: "vote supprimé"
    })
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
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
    res.status()
    resresultjson({
      result: "success",
      message: "vote supprimé"
    })
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