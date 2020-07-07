var express = require('express');
var router = express.Router();
var indexController=require('../controllers/indexController.js');
var usersController=require('../controllers/usersController.js');
/* GET home page. */

router.get('/',indexController.list );
router.get('/ajout',indexController.ajout );
router.get('/votes/:id',indexController.show );
router.post('/votes',indexController.add );
router.delete('/votes/:id',indexController.delete );
router.put('/votes/:id',indexController.update );

router.post("/api/login",usersController.login);
router.post("/api/login",usersController.signup);

module.exports = router;
