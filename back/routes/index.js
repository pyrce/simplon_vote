var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController.js');
var usersController = require('../controllers/userController.js');

/** Routes des vues
 * @module routers/index
 * @requires express express.Router()
 */

/**
 * Retourne la vue de l'inscription
 * @name inscription GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/inscription' - Path
 * @param {function} indexController.inscription
 */
router.get('/inscription', indexController.inscription);

/**
 * @todo Duplicat
 */
//router.get('/inscription', indexController.inscription);

/**
 * Retourne la vue de la liste des sujets de vote
 * @name list GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/' - Path
 * @param {function} indexController.list
 */
router.get('/', indexController.list);

/**
 * Retourne la vue pour l'ajout d'un sujet de vote  
 * @name add POST
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes' - Path
 * @param {function} indexController.add
 */
router.post('/votes', indexController.add);

/**
 * Retourne la vue pour afficher un sujet de vote par rapport à son identifiant
 * @name show GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - Path
 * @param {function} indexController.show
 */
router.get('/votes/:id', indexController.show);

/**
 * Modifie un sujet de vote par rapport à son identifiant
 * @name update PUT
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - Path
 * @param {function} indexController.update
 */
router.put('/votes/:id', indexController.update);

/**
 * Supprime un sujet de vote par rapport à son identifiant
 * @name  delete DELETE
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - Path
 * @param {function} indexController.delete
 */
router.delete('/votes/vote/:id', indexController.delete);

/**
 * vote un sujet de vote par rapport à son identifiant
 * @name vote POST
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - Path
 * @param {function} indexController.vote
 */
router.post('/votes/vote/:id', indexController.vote);

/**
 * Retourne la vue pour afficher les sujets en cours de vote
 * @name encours GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/encours' - Path
 * @param {function} indexController.encours
 */
router.get('/encours', indexController.encours);

/**
 * 
 * @name choix GET
 * @function
 * @memberof module:routes/index
 * @param {string} '/choix/:id' - Path
 * @param {function} indexController.choix 
 */
router.get('/choix/:id', indexController.choix);

/**
 * @name addUser POST
 * @memberof module:routers/index
 */
router.post('/addUser', indexController.addUser);

/**
 * Affiche la vue de la connexion
 * @name VisuLogin GET
 * @memberof module:routers/index
 */
router.get('/login', indexController.visulogin)

/**
 * Effectue la connexion
 * @name login POST
 * @memberof module:routers/index
 */
router.post('/login', indexController.login)

/**
 * @name logout GET
 * @memberof module:routers/index
 */
router.get('/logout', indexController.logout)

/**
 * @name showall GET
 * @memberof module:routers/index
 */
router.get('/dashboard/showall', indexController.showall)

/**
 * @name showmine GET
 * @memberof module:routers/index
 */
router.get('/dashboard/showmine', indexController.showmine)

/**
 * @name showinprogress
 * @memberof module:routers/index
 */
router.get('/dashboard/progress', indexController.showinprogress)

/**
 * 
 * @memberof module:routers/index
 */
// router.get('/dashboard/showpart', indexController.showpart)

/**
 * 
 * @memberof module:routers/index
 */
router.get('/ajout', indexController.ajout);

/**
 * 
 * @memberof module:routers/index
 */
router.get('/dashboard/showend', indexController.showend);

/**
 * Retourne la vue pour afficher les sujets crée par l'utilisateur
 * @name liste_create GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/liste_create' - Path
 * @param {function} indexController.liste_create
 */
router.get('/liste_create', indexController.liste_create)


module.exports = router;