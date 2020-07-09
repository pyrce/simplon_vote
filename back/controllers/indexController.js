const mongoose = require("mongoose");
const Vote = require("../models/vote");
const User = require("../models/user");
const UserVote = require("../models/user_vote");
const validator = require('validator');
var ObjectId = mongoose.Types.ObjectId;

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
 * Liste tout les sujets de vote de l'utilisateur connecté et retourne un vue
 * @name list
 * @memberof module:controllers/index
 * @function
 * @returns {VIEW}
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
 */
controller.list = async (req, res) => {
  var votes = await Vote.find({}).populate("createdBy");
  var user = req.session.user;
  try {
    res.render("dashboard", {
      votes: votes,
      title: "application votes",
      user: user,
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
 * @function
 * @param {string} req.body.pseudo
 * @param {string} req.body.email
 * @param {string} req.body.password
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
 * @param {string} req.body.subject
 * @param {integer} req.body.quota
 * @param {array} req.body.choices
 * @param {integer} req.body.nbVote
 * @param {OjectId} req.body.createdBy
 * @param {array} req.body.participants
 * @param {string} req.body.status ['created', 'inprogress', 'finished']
 * @returns {VIEW} Redirect to '/'
 * @throws {JSON} - Renvoie un JSON en cas d'erreur
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
      _id: new ObjectId(),
      subject,
      quota,
      choices,
      nbVote,
      createdBy,
      participants,
      status
    }).then(msg => {
      res.sendStatus(200)
    })
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
  const votes = await Vote.find({}) .populate("createdBy")
    var user=req.session.user
  // console.log(votes)
  res.render('./dashboard.ejs', {
    title: "sujet",
    votes,
    user:user,
    type: "all"
  })
}

/**
 * Connexion
 * @function
 * @memberof module:controllers/index
 * @param {string} req.body.email
 * @param {string} req.body.password
 * @para
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

    // const monchoix=await UserVote.findOne({vote:id,user:req.session.user._id});
    const monchoix = await UserVote.aggregate([{
      $match: {
        vote: new ObjectId(vote._id),
        user: new ObjectId(req.session.user._id)
      }
    }]);

    res.render("choix", {
      vote: vote,
      monchoix: monchoix[0]
    })

  } catch (error) {
    res.status(400).json({
      result: "error",
      message: error
    })
  }
}
controller.vote = async (req, res) => {
  var currentVote = await Vote.findOne({
    _id: req.params.id
  });
  var liste_choix = currentVote.choices;
  console.log(req.body)
  UserVote.create({
    _id: new ObjectId(),
    user: req.session.user._id,
    vote: req.body.voteid,
    choix: liste_choix.indexOf(req.body.choix)
  }).then((vote) => {
    res.redirect("/votes/" + req.params.id);
  })
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
controller.update = (req, res) => {
  const {
    id
  } = req.params

  try {
    Vote.findOne({_id:id}).then(vote=>{
     var p= vote.participants;
   
     p.push(new ObjectId(req.session.user._id));
     if(p.length==vote.quota)vote.status="inprogress"
     vote.participants=p;
      vote.save();
      res.sendStatus(200);
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

    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({
      result: "error"
    })
  }
}

/** 
 * Mes sujets de vote crée
 * @name Show
 * @memberof module:controllers/index
 * @returns {VIEW} "liste_create"
 */
controller.liste_create = async (req, res) => {
  //req.session.user = user // use session for user connected
  console.log(req.session.user._id)
  var userId = req.session.user._id
  const votes = await Vote.find({
    createdBy: userId
  })

  console.log(votes)
  res.render("liste_create", {
    votes: votes,
    title: "Ma liste des sujets votes "
  })

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
controller.choix = async (req, res) => {
  const {
    id
  } = req.params
  const votes = await Vote.findOne({
    _id: id
  }).populate('createdBy').exec()
  console.log(votes)
  res.render('./choix.ejs', {
    title: "sujet",
    vote: votes
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
  var user=req.session.user;
  // console.log(req.session.user)
  const votes = await Vote.find({
    createdBy: req.session.user._id,
    status: created
  }).populate('createdBy').exec()
  res.render('./dashboard', {
    title: "sujet",
    votes: votes,
    user:user,
    type: "mine"
  })
}

controller.part = async (req, res) => {
  const votes = await UserVote.find({
    user: req.session.user._id
  }).populate({
    path: 'vote',
    populate: {
      path: 'createdBy',
      model: 'users'
    }
  }).exec()
  var result =[];
  votes.forEach(function(element){
    result.push(element.vote)
  })
  console.log(result)
  res.render('dashboard', {
    title: "sujet",
    votes: result,
    user: req.session.user,
    type: "part"
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
  const votes = await Vote.find({
    status: 'inprogress'
  }).populate('createdBy').exec()

  // console.log(votes)
  res.render("encours", {
    title: 'encours',
    votes: votes
  })
}

module.exports = controller;