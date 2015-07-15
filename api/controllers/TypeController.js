/**
 * TypeController
 *
 * @description :: Server-side logic for managing types
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	 /**
     * {SERVER_URL}:{SERVER_PORT}/types/:name
     * GET
     *
     * 
           {
                "code": 200,
                "message": "Data types of lamps",
                "data": [
                    {
                        "name": "parque",
                        "active": true,
                        "privated": true,
                        "userId": "1",
                        "id": "23"
                    }
                ]
            }        
     *
     * 
     **/
     find: function(req,res){
        Type.find( {name: req.param('name') })
            .exec(function(error, type) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find", "controller":"Type"});
                        return res.send({"code":500,"message":"Error to get type of lamp","data":error});
                    }
                     else{
                         sails.log.info({"code":200,"response":"OK","method":"find", "controller":"Type"});
                        return res.send({"code":200,"message": "Data type of lamp","data":[type[0]]});
                    }
            });
     }, 

       /**
     * {SERVER_URL}:{SERVER_PORT}/types/
     *  GET    
            {
                "code": 200,
                "message": "All data types of lamps",
                "data": [
                    {
                        "name": "parque",
                        "active": true,
                        "privated": true,
                        "userId": "2",
                        "id": "23"
                    }
                    {........},
                ]
            }
     *
     * 
     **/
   findAll: function(req,res){   
        Type.find( {})
            .exec(function(error, type) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findAll","controller":"type"});
                        return res.send({"code":500,"message":"Error to get types of lamps","data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"type"});
                        return res.send({"code":200,"message":"All data types of lamps" ,"data": type});
                    }
            });
     },


      /**
     * {SERVER_URL}:{SERVER_PORT}/types/
     *  POST
     *   params:
     *        - name*
     *        - description
     *        - privated
     *        - active
     *        - username*
     *
            {
                "code": 201,
                "message": "Create success",
                "data": [
                    {
                        "id": "55935437fcccff9b1b4b2ce5"
                    }
                ]
            }
     *
     * 
     **/
     create: function(req,res){
        if(!req.param('active'))
            req.allParams().active = true;
        if(!req.param('privated'))
            req.allParams().privated = true;
        if (!req.param('name')||!req.param('user_name')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Type"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else {
            User.find({name: req.param('username') })
                .exec(function(error,user){
                if (user.length!=0){
                    req.allParams.userId= user[0].id;
                    Type.find( {name: req.param('name') })
                        .exec(function(error, exist) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"type"});
                            return res.send({"code":500,"message":"Error to get type of lamp","data":error});
                        }
                        if (exist.length == 0) {
                            req.allParams().userId= user[0].id;
                            Type.create( req.allParams() )
                                .exec(function(error,type){ 
                                if (error){
                                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"type"});
                                    return res.send({"code":500,"message":"Error creating type of lamp","data":error});
                                }
                                else{
                                    sails.log.info({"code":201,"response":"OK","method":"create","controller":"type"});
                                    return res.send({"code":201,"message":"Create success" ,"data": [{id: type.id}]});
                                }
                            });
                        }
                        else {
                            sails.log.info({"code":422,"response":"WARNING","method":"create","controller":"type"});
                            return res.send({"code":422, "message":'Type lamp already exist',"data":[{id:exist[0].id}]});
                        }
                    });
                }   
                 else{
                    sails.log.info({"code":422,"response":"WARNING","method":"create","controller":"type"});
                    return res.send({"code":422, "message":'User does not exist',"data":[]});
                }
            });
        }
    }, 

	

};

