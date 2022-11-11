var express = require('express');
var router = express.Router();
const usercontroller = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * Cuando un usuario no esta logueado no puede acceder a la API interna entonces
 * estas rutas se exponen publicamente tanto para saber si hay un usuario logueado
 * como para poder loguearse y registrarse
 */

router.post('/login', usercontroller.login);
router.post('/logout', usercontroller.logout);

router.post('/register', usercontroller.create);

//TODO: Delete password field from response
router.get('/session',usercontroller.getLoggedUser)

module.exports = router;
