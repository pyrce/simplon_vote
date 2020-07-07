const express = require('express');
const router = express.Router();
const User = require("../models/user");
const userController = require('../controllers/userController.js');

/** Express router providing user related routes
 * @module routers/users
 * @requires express
 */


/**
 * List all users
 * @name List GET
 * @function
 * @memberof module:routers/users
 * @param {string} '/users'
 * @param {function} userController.list
 */
router.get('/', userController.list);

/**
 * Add a new user 
 * @name Add POST
 * @function
 * @memberof module:routers/users
 * @param {string} '/users' - path
 * @param {function} userController.add
 */
router.post('/', userController.add)

/**
 * login a user
 * @name Login POST
 * @function
 * @memberof module:routers/users
 * @param {string} '/users/login' - path
 * @param {function} userController.login
 */
router.post('/login', userController.login);

/**
 * Signup a user
 * @name Signup POST
 * @function
 * @memberof module:routers/users
 * @param {string} '/users/signup' - path
 * @param {function} userController.signup
 */
router.post('/signup', userController.signup);

/**
 * Show a user by its id
 * @name Show GET
 * @function
 * @memberof module:routers/users
 * @param {string} '/users/:id' - path
 * @param {function} userController.show
 */
router.get('/:id', userController.show)

/**
 * Update a user by its id 
 * @name Update PUT
 * @function
 * @memberof module:routers/users
 * @param {string} '/users/:id' - path
 * @param {function} userController.update
 */
router.put('/:id', userController.update);

/**
 * Delete a user by id
 * @name Delete DELETE
 * @function
 * @memberof module:routers/users
 * @param {string} '/users/:id' - path
 * @param {function} userController.delete
 */
router.delete('/:id', userController.delete);

module.exports = router;