var express = require('express');
var router = express.Router();
var indexController=require('../controller/voteController.js');
var usersController=require('../controller/usersController.js');
/* GET home page. */

router.get('/',indexController.liste );
router.get('/api/ajout',indexController.ajout );
router.get('/api/votes/:id',indexController.detailvote );
router.post('/api/votes',indexController.addvote );
router.delete('/api/votes/:id',indexController.deletevote );
router.put('/api/votes/:id',indexController.updatevote );

router.post("/api/login",usersController.login);
router.post("/api/login",usersController.signup);

module.exports = router;
