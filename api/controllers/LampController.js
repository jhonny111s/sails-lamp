/**
 * LampController
 *
 * @description :: Server-side logic for managing lamps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	
	 /**
	 * {SERVER_URL}:{SERVER_PORT}/lamp/find
     * Params: 
     *    - identifier
     *
     *      [
                {
                    "identifier"  : "12Afo4",
                    "name"        : "lamparaEjemplo",
                    "description" : "lampara tipo solar ..",
                    "location"    : {"LAT": 3.44, "LON": 4.55},
                    "privated"    : false,
                    "id"          : 1
                }
            ]
     *
     * 
	 **/
     find: function(req,res){

        if (!req.param('identifier')) {
            res.send(400, "invalid identifier");
        }
        else{
           
        Lamp.find( {identifier: req.param('identifier') })
            .exec(function(error, lamp) {
                    if (error)
                        return res.send(500, error);
                     else
                        return res.send(lamp);
            });
        }
     },       

/*    Lampara.query('SELECT * FROM "prueba"."tablita"', function(err, users) {
    if(err) res.json({ error: err.message }, 400);
    res.send(users.rows);
});*/

   //},


   /**
     * {SERVER_URL}:{SERVER_PORT}/lamp/findAll
     *      
            [
                {
                    "identifier"   : "00b11",
                    "name"         : "lampara1",
                    "description"  : "es una prueba",
                    "location": {"lat": 34,"lon": 566},
                    "id": "5"
                },
                {
                  .....
                },
            ]
            
     *
     * 
     **/
   findAll: function(req,res){
           
        Lamp.find( {})
            .exec(function(error, lamp) {
                    if (error)
                        return res.send(500, error);
                     else
                        return res.send(lamp);
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

        if (!req.param('identifier'))
            res.send(400, "invalid identifier");
        if (!req.param('name')) 
            res.send(400, "invalid name");
        if(!req.param('location'))
            res.send(400, "invalid location");
        if(!req.param('user_name'))
            res.send(400, "invalid user"); 

        else {
            User.find({username: req.param('user_name') })
                .exec(function(error,user){
            if (user.length!=0){

        Lamp.find( {identifier: req.param('identifier') })
            .exec(function(error, exist) {
                if (error)
                        return res.send(500, error);
                if (exist.length == 0) {
                    Lamp.create(req.allParams())
                        .exec(function(error,lamp){
                            console.log(lamp);
                            if (error)
                                return res.send(500, error);
                            else
                                return res.send({id: lamp.id});
                    });
                }
                else 
                    return res.send('Lamp exist');
            });
        }
else
    res.send(400, "invalid user"); 
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

