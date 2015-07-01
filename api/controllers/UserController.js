/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	/**
	 * {SERVER_URL}:{SERVER_PORT}/users/:username
     *  GET
     *     {
            "code": 200,
            "message": "Datos del usuario",
            "data": [
                    {
                        "username": "user123",
                        "admin"   : true,
                        "active"  : true,
                        "id": "1"
                    }
                        ]
            }
     *
     * 
	 **/
     find: function(req,res){ 
        User.find({username: req.param('username') })
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find", "controller":"User"});
                        return res.send({"code":500,"message":"Error al obtener usuario","data":error});
                     }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"find", "controller":"User"});
                        return res.send({"code":200,"message": "Datos del usuario","data":[user[0]]});
                    }
            });
     },  


    /**
     * {SERVER_URL}:{SERVER_PORT}/users/
     * GET
     *          {
                "code": 200,
                "message":"Datos de todos los usuarios",
                "data": [
                    {
                        "username": "user1",
                        "admin"   : true,
                        "active"  : true,
                        "id": "1"
                    },
                    {
                        "username": "user2",
                        "admin"   : false,
                        "active"  : true,
                        "id": "1"
                    },
                    ........
                            ]
                }
     *
     * 
     **/
    findAll: function(req,res){
        User.find()
            .exec(function(error, user) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findAll", "controller":"User"});
                        return res.send({"code":500,"message":"Error al obtener usuarios","data":error});  
                     }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll", "controller":"User"});
                        return res.send({"code":200,"message":"Datos de todos los usuarios" ,"data": user});
                    }
            });
     },  

     /**
	 * {SERVER_URL}:{SERVER_PORT}/users/:username
     * POST
     *      
                {
                    "code": 201,
                    "message":"Creación exitosa",
                    "data": {
                    "id": "1"
                    }
                }       
     *
     * 
	 **/
     create: function(req,res){
        if(!req.param('admin'))
            req.allParams().admin = 'false';
        if(!req.param('active'))
            req.allParams().activo= 'false';

 		User.find({username: req.param('username')})
            .exec(function(error, exist) {
            	if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"create", "controller":"User"});
                    return res.send({"code":500,"message":"Error al obtener usuario","data":error});
                }
            	if (exist.length == 0) {
     				User.create(req.allParams())
     					.exec(function(error,user){
     						if (error){
                                sails.log.error({"code":500,"response":"ERROR","method":"create", "controller":"User"});
                        		return res.send({"code":500,"message":"Error al crear usuario","data":error});
                            }
                     		else{
                                sails.log.info({"code":201,"response":"OK","method":"create", "controller":"User"});
                        		return res.send({"code":201,"message":"Creación exitosa" ,"data": [{id: user.id}]});   
                            }
     				});
    			}
    			else {
                    sails.log.info({"code":422,"response":"WARNING","method":"create", "controller":"User"});
    				return res.send({"code":422, "message":'User already exist',"data":[{id:exist[0].id}]});
                }
     		});
     	},

        /**
     * {SERVER_URL}:{SERVER_PORT}/users/:username
     *  DELETE
     *   
        {
            "code": 200,
            "message":"Eliminación exitosa",
            "data": {
                "id": "1"
            }
        }
    
     *
     * 
     **/
        delete: function(req, res){
            User.find({username: req.param('username')})
                .exec(function(error, exist) {      
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"delete", "controller":"User"});
                    return res.send({"code":500,"message":"Error al obtener usuario","data":error});
                }
                if (exist.length != 0) {
                    User.destroy({username: req.param('username')})
                        .exec(function(error,user){
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"delete", "controller":"User"});
                                return res.send({"code":500,"message":"Error al eliminar usuario","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"delete", "controller":"User"});
                            return res.send({"code":200,"message":"Eliminación exitosa" ,"data": [{id: user[0].id}]}); 
                        }
                    });
                }
                else {
                    sails.log.info({"code":422,"response":"WARNING","method":"delete", "controller":"User"});
                    return res.send({"code":422, "message":'User does not exist',"data":[]});
                }
            });
        }, 
      



	
};
