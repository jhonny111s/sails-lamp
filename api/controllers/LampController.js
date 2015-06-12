/**
 * LampController
 *
 * @description :: Server-side logic for managing lamps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	
	 /**
	 * {SERVER_URL}:{SERVER_PORT}/lamp/find?identifier=12
     *
     *      [
                {
                    "identifier": "12Afo4",
                    "name": "lamparaEjemplo",
                    "description": "lampara tipo solar ..",
                    "location": {"LAT": 3.44, "LON": 4.55},
                    "type": false,
                    "id": 1
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
	
};

