/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * {SERVER_URL}:{SERVER_PORT}/user/find?username=oswaldo
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

        if (!req.param('username')) {
            res.send(400, "invalid parameter");
        }
        else {   
        User.find( {username: req.param('username') })
            .exec(function(error, user) {
                    if (error)
                        return res.send(500, error);
                     else
                        return res.send(user);
            });
        }
     },  

     /**
	 * {SERVER_URL}:{SERVER_PORT}/user/create?username=oswaldo
     *
     *      
                {
                    "id": 1
                }
            
     *
     * 
	 **/
     create: function(req,res){

     	if (!req.param('username')) {
            res.send(400, "invalid parameter");
        }
        else {

 		User.find( {username: req.param('username') })
            .exec(function(error, exist) {
            	if (error)
                        return res.send(500, error);
            	if (exist.length == 0) {
     				User.create({username: req.param('username')})
     					.exec(function(error,user){
     						if (error)
                        		return res.send(500, error);
                     		else
                        		return res.send({id: user.id});
     				});
    			}
    			else 
    				return res.send('User exist');
     		});
        }

     	}, 

     	  hi: function (req, res) {
             return res.send("Hi there!");
  },
	
};

