const apiRouter = require('express').Router();
const userController = require('../controllers/users');
const studentController = require('../controllers/student');

/**
 * Declaracion de rutas de API REST
 * las solicitudes estan protegidas por medio de un middleware que checa la variable de sesion
 * si no existe se redirige a la pagina de login
 */

apiRouter.post('/login', userController.login);
apiRouter.post('/logout', userController.logout);


apiRouter.get('/students', studentController.getStudents);
apiRouter.post('/students', studentController.createStudent);
apiRouter.put('/students/:id', studentController.updateStudent);
apiRouter.delete('/students/:id', studentController.deleteStudent);

module.exports = apiRouter;