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
                "message": [
                    {
                        "identifier"  : "0023",
                        "name"        : "lampara39",
                        "description" : "es una prueba",
                        "location"    : {"LAT": 3.44, "LON": 4.55},
                        "privated"    : false,
                        "id"          : "558b89ac6a6e4d17150ef830",
                        "user_id":    : "1"
                    }
                ]
            }
     *
     * 
	 **/
     find: function(req,res){
        Lamp.find( {identifier: req.param('identifier') })
            .exec(function(error, lamp) {
                console.log({"method":"get", "do":"obtiene los datos de una lampara por su identificador","error":error, "return":lamp}) 
                    if (error)
                        return res.send({"code":500,"message":error});
                     else
                        return res.send({"code":200, "message": lamp});
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
                console.log({"method":"get","do":"obtiene todas las lamparas","error":error, "return":lamp})
                    if (error)
                        return res.send({"code":500,"message":error});
                     else
                        return res.send({"code":200, "message": lamp});
            });
     }, 


    /**
     * {SERVER_URL}:{SERVER_PORT}/lamp/create
     *   params:
     *        - identifier
     *        - name
     *        - description
     *        - location
     *        - privated
     *
     *
     *     
                {
                    "id": 1
                }
    
     *
     * 
     **/
     create: function(req,res){
        if (!req.param('identifier')||!req.param('name')||!req.param('location')||!req.param('user_name'))
            res.send({"code":400, "message":"invalid parameter"});
        else {
            User.find({username: req.param('user_name') })
                .exec(function(error,user){
                if (user.length!=0){
                    req.allParams.userId= user[0].id;
                    Lamp.find( {identifier: req.param('identifier') })
                        .exec(function(error, exist) {
                        if (error)
                            return res.send({"code":500,"message":error});
                        if (exist.length == 0) {
                            req.allParams().userId= user[0].id;
                            Lamp.create( req.allParams() )
                                .exec(function(error,lamp){
                                
                                if (error)
                                    return res.send({"code":500,"message":error});
                                else
                                    return res.send({"code":201,"message":{id: lamp.id}});
                            });
                        }
                        else 
                            return res.send({"code":400,"message":'Lamp exist'});
                    });
                }   
                 else
                    res.send({"code":400, "message":"invalid user"}); 
            });
        }
    }, 


    /**
     * {SERVER_URL}:{SERVER_PORT}/lamp/update
     *   params:
     *        - identifier
     *        - name
     *        - description
     *        - location
     *        - privated
     *
     *
     *     
                {
                    "id": 1
                }
    
     *
     * 
     **/
        update: function(req, res){
            if (!req.param('identifier'))
                res.send(400, "invalid identifier");
            else{
                 Lamp.find( {identifier: req.param('identifier') })
                    .exec(function(error, exist) {
                    if (error)
                        return res.send(500, error);
                    if (exist.length != 0) {
                        Lamp.update({identifier: req.param('identifier')},req.allParams())
                             .exec(function(error,lamp){
                       if (error)
                            return res.send(500, error);
                        else
                            return res.send({id:lamp[0].id});
                        });
                    }
                    else{
                        res.send(400, "invalid identifier");
                    }
                });
            }        
        },

    /**
     * {SERVER_URL}:{SERVER_PORT}/lamp/delete
     *   params:
     *        - identifier
     *
     *
     *     
                {
                    "id": 1
                }
    
     *
     * 
     **/
        delete: function(req, res){
            if (!req.param('identifier'))
                res.send(400, "invalid identifier");
            else{
                Lamp.find( {identifier: req.param('identifier') })
                    .exec(function(error, exist) {
                if (error)
                    return res.send(500, error);
                if (exist.length != 0) {
                    Lamp.destroy({identifier:req.param('identifier')})
                        .exec(function(error,lamp){
                    if (error)
                        return res.send(500, error);
                    else
                        return res.send({id:lamp[0].id});
                    });
                }
                else{
                   res.send(400, "invalid identifier"); 
                }
              }); 
              } 
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

