/**
 * LampController
 *
 * @description :: Server-side logic for managing lamps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	
	 /**
	 * {SERVER_URL}:{SERVER_PORT}/lamps/:identifier
     * GET
     *
     * 
            {
                "code": 200,
                "message": "Data of lamp",
                "data": [
                    {
                        "identifier": "0023",
                        "name": "lampara39",
                        "description": "es una prueba",
                        "location": 12,
                        "privated": false,
                        "id": "558b89ac6a6e4d17150ef830"
                    }
            }        
     *
     * 
	 **/
     find: function(req,res){
        Lamp.find( {identifier: req.param('identifier') })
            .exec(function(error, lamp) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find", "controller":"Lamp"});
                        return res.send({"code":500,"message":"Error to get lamp","data":error});
                    }
                     else{
                         sails.log.info({"code":200,"response":"OK","method":"find", "controller":"Lamp"});
                        return res.send({"code":200,"message": "Data of lamp","data":[lamp[0]]});
                    }
            });
     },  


     /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/user/:identifier
     * GET
     *
     *  
            {
                "code": 200,
                "message": "Data of lampara",
                "data": [
                            {
                                "identifier": "012",
                                "name": "lamparita1",
                                "location": "{\"tt\":rrr}",
                                "privated": true,
                                "userId": "55908b7e10ac8cbf4ba7a3ab",
                                "id": "55935437fcccff9b1b4b2ce5"
                            },
                            {.................}
                        ]
            }       
     *
     * 
     **/
     findUser: function(req,res){
        User.find({username: req.param('username') })
                .exec(function(error,user){
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Lamp"});
                    return res.send({"code":500,"message":"Error to get user","data":error});
                }
                if(user.length!=0){
                    Lamp.find( {userId: user[0].id})
                        .exec(function(error, lamp) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Lamp"});
                            return res.send({"code":500,"message":"Error to get lamp","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"findUser","controller":"Lamp"});
                            return res.send({"code":200,"message": "Data of lamp","data":lamp});
                        }
                    });         
                }
                else{
                    sails.log.info({"code":422,"response":"WARNING","method":"finUser","controller":"Lamp"});
                    return res.send({"code":422, "message":'User does not exist',"data":[]});
                }
        });            
     },     

/*    Lampara.query('SELECT * FROM "prueba"."tablita"', function(err, users) {
    if(err) res.json({ error: err.message }, 400);
    res.send(users.rows);
});*/

   //},


   /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/
     *  GET    
            {
                "code": 200,
                "message": "Data of all lamps",
                "data": [
                        {
                            "identifier": "0023",
                            "name": "lampara39",
                            "description": "es una prueba",
                            "location": 12,
                            "privated": false,
                            "id": "558b89ac6a6e4d17150ef830"
                        },
                        {
                          ........
                        },
                    ]
            }
     *
     * 
     **/
   findAll: function(req,res){   
        Lamp.find( {})
            .exec(function(error, lamp) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"findAll","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error to get lamps","data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"Lamp"});
                        return res.send({"code":200,"message":"Data of all lamps" ,"data": lamp});
                    }
            });
     }, 


    /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/:identifier
     *  POST
     *   params:
     *        - name*
     *        - description
     *        - location*
     *        - privated
     *        - type_lamp
     *        - username*
     *
            {
                "code": 201,
                "message": "create success",
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
            req.allParams().active= true;
        if(!req.param('privated'))
            req.allParams().privated = true;
        if (!req.param('identifier')||!req.param('name')||!req.param('location')||!req.param('username')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Lamp"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else {
            User.find({username: req.param('username') })
                .exec(function(error,user){
                if (user.length!=0){
                    req.allParams.userId= user[0].id;
                    Lamp.find( {identifier: req.param('identifier') })
                        .exec(function(error, exist) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Lamp"});
                            return res.send({"code":500,"message":"Error to get lamp","data":error});
                        }
                        if (exist.length == 0) {
                            req.allParams().userId= user[0].id;
                            Lamp.create( req.allParams() )
                                .exec(function(error,lamp){ 
                                if (error){
                                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Lamp"});
                                    return res.send({"code":500,"message":"Error creating lamp","data":error});
                                }
                                else{
                                    sails.log.info({"code":201,"response":"OK","method":"create","controller":"Lamp"});
                                    return res.send({"code":201,"message":"Create success" ,"data": [{id: lamp.id}]});
                                }
                            });
                        }
                        else {
                            sails.log.info({"code":422,"response":"WARNING","method":"create","controller":"Lamp"});
                            return res.send({"code":422, "message":'Lamp already exist',"data":[{id:exist[0].id}]});
                        }
                    });
                }   
                 else{
                    sails.log.info({"code":422,"response":"WARNING","method":"create","controller":"Lamp"});
                    return res.send({"code":422, "message":'User does not exist',"data":[]});
                }
            });
        }
    }, 


    /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/:identifier
     *  PUT
     *   params:
     *        - name*
     *        - description
     *        - location*
     *        - privated
     *        - type_lamp
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
            if (!req.param('identifier')){
                sails.log.info({"code":400,"response":"WARNING","method":"update","controller":"Lamp"});
                return res.send({"code":400, "message":'Invalid parameter',"data":[]});
            }
            else{
                 Lamp.find( {identifier: req.param('identifier') })
                    .exec(function(error, exist) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error to get lamp","data":error});
                    }
                    if (exist.length != 0) {
                        Lamp.update({identifier: req.param('identifier')},req.allParams())
                             .exec(function(error,lamp){
                       if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error updating lamp","data":error});
                       }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"update","controller":"Lamp"});
                            return res.send({"code":200,"message":"Update success" ,"data": [{id:lamp[0].id}]});
                        }
                        });
                    }
                    else{
                        sails.log.info({"code":422,"response":"WARNING","method":"update","controller":"Lamp"});
                        return res.send({"code":422, "message":'Identifier does not exist',"data":[]});
                    }
                });
            }        
        },

    /**
     * {SERVER_URL}:{SERVER_PORT}/lamps/:identifier
     * DELETE
     *     
        {
            "code": 200,
            "message": "Delete success",
            "data": [
                {
                    "id": "1"
                }
            ]
        }
    
     *
     * 
     **/
        delete: function(req, res){
                Lamp.find( {identifier: req.param('identifier') })
                    .exec(function(error, exist) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"delete","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error to get lamp","data":error});
                    }
                    if (exist.length != 0) {
                        Lamp.destroy({identifier:req.param('identifier')})
                            .exec(function(error,lamp){
                            if (error){
                                sails.log.error({"code":500,"response":"ERROR","method":"delete","controller":"Lamp"});
                                return res.send({"code":500,"message":"Error deleting lamp","data":error});
                            }
                            else{
                                sails.log.info({"code":200,"response":"OK","method":"delete","controller":"Lamp"});
                                return res.send({"code":200,"message":"Delete success" ,"data": [{id:lamp[0].id}]});
                            }
                        });
                    }
                    else{
                        sails.log.info({"code":422,"response":"WARNING","method":"delete","controller":"Lamp"});
                        return res.send({"code":422, "message":'Identifier does not exist',"data":[]});
                    }
              }); 
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
                    "name": "lampara39"
                },
                {................},
            ]    
        }
    
     *
     * 
     **/
       select: function(req, res){
            Lamp.native(function(err, collection) {
                if (err) return res.serverError(err);
                collection.find({}, {name: true}).toArray(function (error, lamp) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"select","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error to get lamps","data":error});
                    }
                    else{
                        sails.log.info({"code":200,"response":"OK","method":"select","controller":"Lamp"});
                        return res.send({"code":200,"message":"Select ok" ,"data": lamp});
                    }
                });
            });
       },   


	
};

