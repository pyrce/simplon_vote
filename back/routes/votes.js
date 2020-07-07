// const express = ;
const router = require('express').Router();
const voteController = require('../controllers/voteController.js');

/** Express router providing user related routes
 * @module routers/votes
 * @requires express
 */

/**
 * Renvoie la liste de tout les votes
 * @name List GET
 * @function
 * @memberof module:routers/votes
 * @param {string} '/api/votes'
 * @param {function} voteController.list
 */
router.get('/', voteController.list)

/**
 * Ajoute un nouveau sujet de vote
 * @name Add POST
 * @function
 * @memberof module:routers/votes
 * @param {string} '/api/votes'
 * @param {function} voteController.add
 */
router.post('/', voteController.add)

/**
 * Show one vote by a id
 * @name Show GET
 * @function
 * @memberof module:routers/votes
 * @param {string} '/api/votes/:id'
 * @param {function} voteController.show
 */
router.get('/:id', voteController.show)

/**
 * Update a vote by id 
 * @name Update PUT
 * @function
 * @memberof module:routers/votes
 * @param {string} '/api/users/:id'
 * @param {function} voteController.update
 */
router.put('/:id', voteController.update);

/**
 * Delete a vote by id
 * @name Delete DELETE
 * @function
 * @memberof module:routers/votes
 * @param {string} '/api/votes/:id'
 * @param {function} voteController.delete
 */
router.delete('/:id', voteController.delete);


// router.get('/api/ajout',voteController.ajout );
// router.get('/api/votes/:id',voteController.detailvote );
// router.post('/api/votes',voteController.addvote );
// router.delete('/api/votes/:id',voteController.deletevote );
// router.put('/api/votes/:id',voteController.updatevote );

// router.post("/api/login",usersController.login);
// router.post("/api/login",usersController.signup);
// router.get('/',voteController.liste );


module.exports = router;
