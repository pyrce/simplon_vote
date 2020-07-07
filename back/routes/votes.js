// const express = ;
const router = require('express').Router();
const voteController = require('../controllers/voteController.js');

/** Express router providing user related routes
 * @module routers/votes
 * @requires express
 */

/**
 * List all votes
 * {GET} /votes
 */
router.get('/',voteController.list )

/**
 * Add a new vote 
 * @route  {POST} /votes
 */
// router.post('/',voteController.add )

/**
 * Show one vote by a id
 * @route  {GET} /votes/:id
 */
// router.get('/:id',voteController.show)

/**
 * Update a vote by id 
 * @route  {PUT} /votes/:id
 */
// router.put('/:id',voteController.update );

/**
 * Delete a vote by id
 * @route  {DELETE} /votes/:id
 */
// router.delete('/:id',voteController.delete );


// router.get('/api/ajout',voteController.ajout );
// router.get('/api/votes/:id',voteController.detailvote );
// router.post('/api/votes',voteController.addvote );
// router.delete('/api/votes/:id',voteController.deletevote );
// router.put('/api/votes/:id',voteController.updatevote );

// router.post("/api/login",usersController.login);
// router.post("/api/login",usersController.signup);
// router.get('/',voteController.liste );


module.exports = router;
