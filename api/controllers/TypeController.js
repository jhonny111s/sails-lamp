/**
 * TypeController
 *
 * @description :: Server-side logic for managing types
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
        Type.find( {identifier: req.param('identifier') })
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
	
};

