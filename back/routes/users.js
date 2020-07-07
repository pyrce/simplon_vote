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
 * @verb GET
 * @route  {GET} /users
 */
router.get('/', userController.list);

/**
 * Add a new user 
 * @route  {POST} /users
 */
router.post('/',userController.add )

/**
 * login a user
 * @route  {POST} /users/login
 */
router.post('/login',userController.login );

/**
 * signup a user
 * @route  {POST} /users/signup
 */
router.post('/signup',userController.signup );

/**
 * Show one user by a id
 * @route  {GET} /users/:id
 */
router.get('/:id',userController.show)

/**
 * Update a user by id 
 * @route  {PUT} /users/:id
 */
router.put('/:id',userController.update );

/**
 * Delete a user by id
 * @route  {DELETE} /users/:id
 */
router.delete('/:id',userController.delete );

module.exports = router;