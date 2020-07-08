var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController.js');
var usersController = require('../controllers/userController.js');

/** Routes des vues
 * @module routers/index
 * @requires express
 */

/**
 * Retourne la vue de l'inscription
 * @name Inscription GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/inscription' - uri
 * @param {function} indexController.inscription
 */
router.get('/inscription', indexController.inscription);

/**
 * Retourne la vue de la liste des sujets de vote
 * @name List GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/' - uri
 * @param {function} indexController.list
 */
router.get('/', indexController.list);

/**
 * Retourne la vue pour afficher un sujet de vote par rapport à son identifiant
 * @name Show GET
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - uri
 * @param {function} indexController.show
 */
router.get('/votes/:id', indexController.show);

/**
 * Retourne la vue pour l'ajout d'un sujet de vote  
 * @name Add POST
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes' - uri
 * @param {function} indexController.add
 */
router.post('/votes', indexController.add);

/**
 * Supprime un sujet de vote par rapport à son identifiant
 * @name  Delete DELETE
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - uri
 * @param {function} indexController.delete
 */
router.delete('/votes/:id', indexController.delete);

/**
 * Modifie un sujet de vote par rapport à son identifiant
 * @name Update PUT
 * @function
 * @memberof module:routers/index
 * @param {string} '/votes/:id' - uri
 * @param {function} indexController.update
 */
router.put('/votes/:id', indexController.update);
router.get('/inscription', indexController.inscription);
router.post('/addUser', indexController.addUser);
// router.post("/api/login", usersController.login);
// router.post("/api/signup", usersController.signup);

router.post('/login', indexController.login)
router.get('/login',indexController.visulogin)
router.get('/dashboard',indexController.dashboard)
router.get('/ajout', indexController.ajout);


module.exports = router;