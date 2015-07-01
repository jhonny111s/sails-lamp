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
     *  [
            {
                "code": 200,
                "message": "Datos de la lampara",
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
        ]
     *
     * 
	 **/
     find: function(req,res){
        Lamp.find( {identifier: req.param('identifier') })
            .exec(function(error, lamp) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find", "controller":"Lamp"});
                        return res.send({"code":500,"message":"Error al obtener lampara","data":error});
                    }
                     else{
                         sails.log.info({"code":200,"response":"OK","method":"find", "controller":"Lamp"});
                        return res.send({"code":200,"message": "Datos de la lampara","data":[lamp[0]]});
                    }
            });
     },  


     findUser: function(req,res){
        User.find({username: req.param('username') })
                .exec(function(error,user){
                if (error){
                    sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Lamp"});
                    return res.send({"code":500,"message":"Error al obtener usuario","data":error});
                }
                if(user.length!=0){
                    Lamp.find( {userId: user[0].id})
                        .exec(function(error, lamp) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"findUser","controller":"Lamp"});
                            return res.send({"code":500,"message":"Error al obtener lamparas","data":error});
                        }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"findUser","controller":"Lamp"});
                            return res.send({"code":200,"message": "Datos de la lampara","data":[lamp]});
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
            "message": [
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
                        return res.send({"code":500,"message":"Error al obtener las lamparas","data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"Lamp"});
                        return res.send({"code":200,"message":"Datos de todos las lamparas" ,"data": lamp});
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
     *        - user_name*
     *
            {
                "code": 201,
                "message": "Creación exitosa",
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
        if(!req.param('privated'))
            req.allParams().privated = true;
        if (!req.param('identifier')||!req.param('name')||!req.param('location')||!req.param('user_name')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Lamp"});
            return res.send({"code":400, "message":'invalid parameter',"data":[]});
        }
        else {
            User.find({username: req.param('user_name') })
                .exec(function(error,user){
                if (user.length!=0){
                    req.allParams.userId= user[0].id;
                    Lamp.find( {identifier: req.param('identifier') })
                        .exec(function(error, exist) {
                        if (error){
                            sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Lamp"});
                            return res.send({"code":500,"message":"Error al obtener lampara","data":error});
                        }
                        if (exist.length == 0) {
                            req.allParams().userId= user[0].id;
                            Lamp.create( req.allParams() )
                                .exec(function(error,lamp){ 
                                if (error){
                                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Lamp"});
                                    return res.send({"code":500,"message":"Error al crear lampara","data":error});
                                }
                                else{
                                    sails.log.info({"code":201,"response":"OK","method":"create","controller":"Lamp"});
                                    return res.send({"code":201,"message":"Creación exitosa" ,"data": [{id: lamp.id}]});
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
                "message": "Actualización exitosa",
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
                return res.send({"code":400, "message":'invalid parameter',"data":[]});
            }
            else{
                 Lamp.find( {identifier: req.param('identifier') })
                    .exec(function(error, exist) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error al obtener lampara","data":error});
                    }
                    if (exist.length != 0) {
                        Lamp.update({identifier: req.param('identifier')},req.allParams())
                             .exec(function(error,lamp){
                       if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"update","controller":"Lamp"});
                        return res.send({"code":500,"message":"Error al actualizar lampara","data":error});
                       }
                        else{
                            sails.log.info({"code":200,"response":"OK","method":"update","controller":"Lamp"});
                            return res.send({"code":200,"message":"Actualización exitosa" ,"data": [{id:lamp[0].id}]});
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
            "message": "Eliminación exitosa",
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
                        return res.send({"code":500,"message":"Error al obtener lampara","data":error});
                    }
                    if (exist.length != 0) {
                        Lamp.destroy({identifier:req.param('identifier')})
                            .exec(function(error,lamp){
                            if (error){
                                sails.log.error({"code":500,"response":"ERROR","method":"delete","controller":"Lamp"});
                                return res.send({"code":500,"message":"Error al eliminar lampara","data":error});
                            }
                            else{
                                sails.log.info({"code":200,"response":"OK","method":"delete","controller":"Lamp"});
                                return res.send({"code":200,"message":"Eliminación exitosa" ,"data": [{id:lamp[0].id}]});
                            }
                        });
                    }
                    else{
                        sails.log.info({"code":422,"response":"WARNING","method":"delete","controller":"Lamp"});
                        return res.send({"code":422, "message":'Identifier does not exist',"data":[]});
                    }
              }); 
        },  


       select: function(req, res){
             Lamp.find().exec(function(error, lamp) {
                    if (error)
                        return res.send(500, error);
                    else 
                        return res.json(lamp);

       });
       },   

	
};

