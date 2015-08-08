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
     * {SERVER_URL}:{SERVER_PORT}/types/user/:username
     * GET
     * obtiene datos de los tipos de lamparas perteneciantes a un usuario 
     *  
           {
            "code": 200,
            "message": "Data of type lamp",
            "data": [
                {
                    "name": "tipoparque",
                    "active": true,
                    "privated": true,
                    "userId": "559f44c2dbf2d06318b48b59",
                    "id": "55b06d1336e21f03136bb498"
                },
                {
                    "active": true,
                    "name": "mierdita",
                    "privated": true,
                    "userId": "559078c91ddb615b404a0d89",
                    "id": "55b6dd9cca31e90b12f2efe7"
                }
            ]
}      
     *
     * 
     **/
     findUser: function(req,res){
        User.find({username: req.param('username') })
                .exec(function(error,user){
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Type"});
                    return res.send({"code":500,"message":"Error to get user","data":error});
                }
                if(user.length!=0){
                    Type.find({or:[{userId: user[0].id},{active:true}]})
                        .exec(function(error, lamp) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Type"});
                            return res.send({"code":500,"message":"Error to get type lamp","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"findUser","controller":"Type"});
                            return res.send({"code":200,"message": "Data of type lamp","data":lamp});
                        }
                    });         
                }
                else{
                    sails.log.info({"code":422,"response":"WARNING","method":"finUser","controller":"Type"});
                    return res.send({"code":422, "message":'User does not exist',"data":[]});
                }
        });            
     },     


    /**
     * {SERVER_URL}:{SERVER_PORT}/types/
     *  GET 
        obtiene todos los tipos de lamparas  
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
     * {SERVER_URL}:{SERVER_PORT}/types/:name
     *  POST
     crea un tipo de lampara
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
        if (!req.param('name')||!req.param('username')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Type"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else {
            User.find({username: req.param('username') })
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

    /**
     * {SERVER_URL}:{SERVER_PORT}/types/:id
     *  PUT
     actualiza un tipo de lampara por su identificador de base de datos
     *   params:
     *        - name
     *        - description
     *        - privated
     *        - active
     *        - username
     *        - id*
     *
     *
     *     
            {
                "code": 200,
                "message": "Update success",
                "data": [
                    {
                        "id": "1"
                    }
                ]
            }
    
     *
     * 
     **/
     update: function(req, res){
            if (!req.param('id')){
                sails.log.info({"code":400,"response":"WARNING","method":"update","controller":"Type"});
                return res.send({"code":400, "message":'Invalid parameter',"data":[]});
            }
            else{
                 Type.find( {id: req.param('id') })
                    .exec(function(error, exist) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Type"});
                        return res.send({"code":500,"message":"Error to get type lamp","data":error});
                    }
                    if (exist.length != 0) {
                        Type.update({id: req.param('id')},req.allParams())
                             .exec(function(error,type){
                       if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Type"});
                        return res.send({"code":500,"message":"Error updating type lamp","data":error});
                       }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"update","controller":"Type"});
                            return res.send({"code":200,"message":"Update success" ,"data": [{id:type[0].id}]});
                        }
                        });
                    }
                    else{
                        sails.log.info({"code":422,"response":"WARNING","method":"update","controller":"Type"});
                        return res.send({"code":422, "message":'Id does not exist',"data":[]});
                    }
                });
            }        
        },

             /**
     * {SERVER_URL}:{SERVER_PORT}/select/lamps
     * DELETE
     *     
        {
            "code": 200,
            "message": "Select ok",
            "data": [
                {
                    "_id": "558b89ac6a6e4d17150ef830",
                    "name": "tipo parque"
                },
                {................},
            ]    
        }
    
     *
     * 
     **/
       select: function(req, res){
            User.find({username: req.param('username') })
                    .exec(function(error,user){
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Type"});
                        return res.send({"code":500,"message":"Error to get user","data":error});
                    }
                    if(user.length!=0){
                        Type.native(function(err, collection) {
                            if (err) return res.serverError(err);
                            console.log(user[0].id);
                            collection.find({$or:[{userId: user[0].id},{active:true}]},{name: true})
                                    .toArray(function(error, type) {
                                    if (error){
                                        sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Type"});
                                        return res.send({"code":500,"message":"Error to get type lamp","data":error});
                                    }
                                    else{
                                        sails.log.info({"code":200,"response":"OK","method":"findUser","controller":"Type"});
                                        return res.send({"code":200,"message": "Select Ok","data":type});
                                    }
                                });         
                            });
                    }
                    else{
                        sails.log.info({"code":422,"response":"WARNING","method":"select","controller":"Type"});
                        return res.send({"code":422, "message":'Select Ok',"data":[]});
                    }
            });            
         },  

	

};

