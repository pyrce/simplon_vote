const mongoose = require("mongoose");
const Vote = require("../models/vote");
const User = require("../models/user");
const validator = require('validator');

/** Controller INDEX
 * @module controllers/index
 * @requires mongoose
 */

//Set up default mongoose connection
// var mongoDB = 'mongodb://localhost:27017/simplon-vote';
// var ObjectId=mongoose.Types.ObjectId;
// mongoose.connect(mongoDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

var controller = {}

/** 
 * Liste tout les sujets de vote et retourne un vue
 * @name list
 * @memberof module:controllers/index
 * @function
 * @returns {VIEW}
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
 */
controller.list = async (req, res) => {
  const votes = await Vote.find({})
  try {
    res.render("dashboard", {
      votes: votes,
      title: "application votes",
      type: "all"
    })
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}

/** 
 * Ajout un utilisateur et redirige sur '/'
 * @name addUser
 * @memberof module:controllers/index
 * @fonction
 * @param {string} pseudo
 * @param {string} email
 * @param {string} mot de passe
 * @returns {VIEW} redirect to '/'
 */

controller.addUser = async (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    return res.redirect('/inscription')
  }

  User.create({
    login: validator.escape(req.body.pseudo),
    email: req.body.email,
    password: req.body.password
  }).then(
    req.session.msgFlash = {
      type: "success",
      message: "Félicitation vous êtes inscrit"
    }, res.redirect('/')
  )
}

/** 
 * Ajoute un sujet de vote et redirige sur '/'
 * @name add
 * @memberof module:controllers/index
 * @function
 * @param {string} subject
 * @param {integer} quota
 * @param {array} choices
 * @param {integer} nbVote
 * @param {OjectId} createdBy
 * @param {array} participants
 * @param {string} status ['created', 'inprogress', 'finished']
 * @returns {VIEW} Redirect to '/'
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
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

/**
 * @name visulogin
 * @memberof module:controllers/index
 */
controller.visulogin = async (req, res) => {
  res.render('./index.ejs', {
    title: "login"
  })
}

/**
 * @name dashboard
 * @memberof module:controllers/index
 */
controller.dashboard = async (req, res) => {
  const votes = await Vote.find().populate('createdBy').exec()
  console.log(votes)
  res.render('./dashboard.ejs', {
    title: "sujet",
    votes: votes
  })
}
controller.showall = async (req, res) => {
  const votes = await Vote.find({})
    .populate("createdBy")
  // console.log(votes)
  res.render('./dashboard.ejs', {
    title: "sujet",
    votes,
    type: "all"
  })
}

/**
 * Connexion
 */
controller.login = async (req, res) => {
  const {
    email,
    password
  } = req.body
  if (!email || !password) {
    req.session.msgFlash = {
      type: "danger",
      message: "Donnée manquante"
    }
    res.redirect('/login')
  } else {
    try {
      const user = await User.findOne({
        email: email
      })
      if (!user || (user.email !== email && user.password !== password)) {
        req.session.msgFlash = {
          type: "danger",
          message: "Identifiants invalide"
        }
        res.redirect('/login')
      } else {
        req.session.user = user // use session for user connected
        console.log(req.session)
        req.session.msgFlash = {
          type: "success",
          message: "Bienvenu " + user.login
        }
        res.redirect('/dashboard/showall')
      }
    } catch (error) {
      req.session.msgFlash = {
        type: "error",
        message: "Identifiants invalide"
      }
      res.redirect('/login', )
    }
  }
}

/**
 * @name logout
 * @memberof module:controllers/index
 */
controller.logout = async (req, res) => {
  req.session = null
  res.redirect('/')
}

/** 
 * Affiche le détail d'un sujet de vote
 * @name show
 * @memberof module:controllers/index
 * @function
 * @returns {VIEW} "detail"
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
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

/**
 * @name inscription
 * @memberof module:controllers/index
 */
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

/** 
 * Modifie un sujet de vote
 * @name update
 * @memberof module:controllers/index
 * @function
 * @param {string} subject
 * @param {integer} quota
 * @param {array} choices
 * @param {integer} nbVote
 * @param {OjectId} createdBy
 * @param {array} participants
 * @param {string} status ['created', 'inprogress', 'finished']
 * @returns {VIEW} Redirect to '/'
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
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

/** 
 * Supprime un sujet de vote
 * @todo Tester le fonctionnement
 * @name delete
 * @memberof module:controllers/index
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
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

/**
 * @name ajout
 * @memberof module:controllers/index
 */
controller.ajout = async (req, res) => {
  res.status(201).json({
    user
  })
}

/**
 * @name showend
 * @memberof module:controllers/index
 */
controller.showend = async (req, res) => {
  const terminer = 'finished';
  const votes = await Vote.find({
    status: terminer
  }).populate('createdBy').exec()
  // console.log(votes)
  res.render('./dashboard', {
    title: "sujet",
    votes: votes,
    type: "end"
  })
}

controller.showinprogress = async (req, res) => {
  const inprogress = 'inprogress';
  const votes = await Vote.find({
    status: inprogress
  }).populate('createdBy').exec()
  // console.log(votes)
  res.render('./dashboard', {
    title: "sujet",
    votes: votes,
    type: "progress"
  })
}

controller.showmine = async (req, res) => {
  const created = 'created';
  // console.log(req.session.user)
  const votes = await Vote.find({
    createdBy: req.session.user._id,
    status: created
  }).populate('createdBy').exec()
  res.render('./dashboard', {
    title: "sujet",
    votes: votes,
    type: "mine"
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

/** show inprogress sujet
 * @name show
 * @memberof module:controllers/index
 * @function
 * @returns {VIEW} "encours"
 */
controller.encours = async (req, res) => {
  const votes = await Vote.find({status: 'inprogress'}).populate('createdBy').exec()
  
  // console.log(votes)
 res.render("encours",{title:'encours',votes : votes })
}

module.exports = controller;