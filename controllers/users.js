const User = require('../models/user');
const bcrypt = require('bcrypt');

/**
 *@type {{logout: userController.logout, getLoggedUser: ((function(*, *, *): Promise<void>)|*), create: ((function(*, *, *): Promise<void>)|*), update: ((function(*, *, *): Promise<void>)|*), login: ((function(*, *, *): Promise<void>)|*), delete: ((function(*, *, *): Promise<void>)|*)}}
 * Controlador CRUD de usuarios, ademas se implementarion metodos para el login y logout
 */

const userController = {
    //POST /login
    login: async (req, res,next) => {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email}});
        if(user) {
            const match = await bcrypt.compare(password, user.password);
            if(match) {
                delete user.password;
                req.session.user = user;
                res.json({success: true, user:req.session.user});
            } else {
                res.json({success:false, message: 'Password invalido'});
            }
        } else {
            res.json({success:false,message: 'Usuario no encontrado'});
        }
    },

    logout: (req, res,next) => {
        req.session.destroy(function () {
            /*Esto da un error si no se pasa una funcion de vuelta*/
            res.json({success:true,message: 'Sesion cerrada'});
        });
    },
    create: async (req, res,next) => {
        const {name, email, password} = req.body;
        //Query equivalent to: INSERT INTO users (name, email, password) VALUES (name, email, password);
        const user = await User.create({name, email, password});
        req.session.user = user;
        res.json({success: true, payload: user});
    },
    update: async (req, res,next) => {
        const {name, email, password} = req.body;
        //Query equivalent to: UPDATE users SET name = name, email = email WHERE id = id;
        try{
        const user = await User.update({name, email}, {where: {id: req.params.id}});
        res.json({success: true, payload: user});
        }catch(err){
            console.log(err);
        }
    },
    delete: async (req, res,next) => {
        //Query equivalent to: DELETE FROM users WHERE id = id;
        const user = await User.destroy({where: {id: req.params.id}});
        res.json({success: true, payload: user});
    },
    getLoggedUser: async (req, res,next) => {
        if (req.session.user){
            res.json({success:true,payload: req.session.user});
        }else{
            res.json({success:false,payload: null});
        }
    }
};

module.exports = userController;