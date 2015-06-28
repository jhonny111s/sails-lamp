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
            "message": [
                    {
                        "username": "user123",
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
                console.log({"method":"get", "do":"obtiene los datos de un usuario por su username","error":error, "return":user}) 
                    if (error)
                        return res.send({"code":500,"message":error});
                     else
                        return res.send({"code":200, "message": user});
            });
     },  


    /**
     * {SERVER_URL}:{SERVER_PORT}/users/
     * GET
     *          {
                "code": 200,
                "message": [
                    {
                        "username": "user1",
                        "id": "1"
                    },
                    {
                        "username": "user2",
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
                console.log({"method":"get","do":"obtiene todos los usuarios","error":error, "return":user}) 
                    if (error)
                        return res.send({"code":500,"message":error});
                     else
                        return res.send({"code":200, "message": user});
            });
     },  

     /**
	 * {SERVER_URL}:{SERVER_PORT}/users/:username
     * POST
     *      
                {
                    "code": 201,
                    "message": {
                    "id": "1"
                    }
                }       
     *
     * 
	 **/
     create: function(req,res){
        if(!req.param('admin'))
            req.allParams().admin = 'false';
        if(!req.param('activo'))
            req.allParams().activo= 'false';

 		User.find({username: req.param('username')})
            .exec(function(error, exist) {
                console.log({"method":"get","do":"verifica la existencia de un usuario","error":error, "return":exist}) 
            	if (error)
                        return res.send({"code":500,"message":error});
            	if (exist.length == 0) {
     				User.create(req.allParams())
     					.exec(function(error,user){
                            console.log({"method":"put","do":"crea un usuario","error":error, "return":user}) 
     						if (error)
                        		return res.send({"code":500,"message":error});
                     		else
                        		return res.send({"code":201, "message":{id: user.id}});
     				});
    			}
    			else 
    				return res.send({"code":400, "message":'User exist'});
     		});

     	},

        /**
     * {SERVER_URL}:{SERVER_PORT}/users/:username
     *  DELETE
     *   
        {
            "code": 200,
            "message": {
                "id": "1"
            }
        }
    
     *
     * 
     **/
        delete: function(req, res){
                User.find({username: req.param('username')})
                    .exec(function(error, exist) {
                    console.log({"method":"get","do":"verifica la existencia de un usuario","error":error, "return":exist})       
                    if (error)
                        return res.send({"code":500,"message":error});
                    if (exist.length != 0) {
                        User.destroy({username: req.param('username')})
                            .exec(function(error,user){
                             console.log({"method":"delete","do":"elimina un usuario por su username","error":error, "return":user})   
                            if (error)
                                return res.send({"code":500,"message":error});
                            else
                                return res.send({"code":200, "message":{id: user[0].id}});
                                });
                     }
                     else       
                        return res.send({"code":400, "message":{}});
                });
        }, 
      



	
};
