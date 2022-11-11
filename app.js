var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

const expressSession = require('express-session');
const sequelize = require('./config/sequelize');

const SessionStore = require('express-session-sequelize')(expressSession.Store);

const sequelizeSessionStore = new SessionStore({
    db: sequelize
});


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sequelizeSessionStore
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v0',(req,res,next)=>{
    /**
     * Las rutas de la API interna o privada esta protegida por las variables de session
     * y por lo tanto, solo se puede acceder a ellas si se ha iniciado sesion.
     */
   if (!req.session.user){
         res.status(401).send({message: 'Unauthorized'});
   } else {
       next();
   }
} ,apiRouter);

(()=>sequelize.syncTables())();

module.exports = app;
