/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * CommandController
 *
 * @description :: Server-side logic for managing commands
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



 /**
	Función para tratar el formato trasmitido desde las lamparas	
 **/
function verifydata(data){
	var dict = {}
		var k = data.split(';')
		for (var name in k) {
			tmp = k[name].split(':')
			if(tmp[0]=='' || tmp[1]=='')
				return 0; 
			else
				dict[tmp[0]] = tmp[1]   
		}
		return JSON.stringify(dict); 
	}

module.exports = {

	   /**
     * {SERVER_URL}:{SERVER_PORT}/reports/:identifier
     *  GET    
          {
    "code": 200,
    "message": "Data of all commands to lamp",
    "data": [
        {
            "parameters": {
                "ID": "nombre",
                "ESTADO": "encen_apag",
                "MARANGA": "changos"
            },
            "identifier": "07346",
            "finalDate": "2015-09-03T06:03:24.768Z",
            "id": "55e7e2acaeb52f8e191e4dbc"
        },
        {.......
        }
    ]
}
     *
     * 
     **/
   find: function(req,res){   
        Report.find({where: {identifier:req.param('identifier')}, sort: 'finalDate DESC'})
            .exec(function(error, report) {
                    if (error){
                        sails.log.error({"code":500,"response":"ERROR","method":"find","controller":"Report"});
                        return res.send({"code":500,"message":"Error to get report", "data":error});
                    }
                     else{
                        sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"Report"});
                        return res.send({"code":200,"message":"Data of all report to lamp" ,"data": report});
                    }
            });
     }, 

    /**
     * {SERVER_URL}:{SERVER_PORT}/reports/:identifier
     *  POST
     crea una entrada de las variables que reporta una lampara.
     *   params:
     *        - identifier*
     *        - parameters*
     *        - finalDate
     *
           {
			    "code": 201,
			    "message": "Create success",
			    "data": [
			        {
			            "id": "55e7d60ed5b58991167f1901"
			        }
			    ]
			}
     *
     * 
     **/
    create: function(req, res){
        if(!req.param('finalDate'))
            req.allParams().finalDate= new Date();
    	if (!req.param('identifier') || !req.param('parameters')){
            sails.log.info({"code":400,"response":"WARNING","method":"create","controller":"Report"});
            return res.send({"code":400, "message":'Invalid parameter',"data":[]});
        }
        else{
	        Lamp.find({identifier: req.param('identifier') })
	            .exec(function(error,lamp){
	                if (error){
	                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Command"});
	                    return res.send({"code":500,"message":"Error to get lamp","data":error});
	                }
	                if(lamp.length!=0){
	                	t =verifydata(req.param('parameters'))
	                	if(t){
	                		req.allParams().parameters= t;
	                		 Report.create( req.allParams() )
	            					.exec(function(error,report){ 
						                if (error){
						                    sails.log.error({"code":500,"response":"ERROR","method":"create","controller":"Report"});
						                    return res.send({"code":500,"message":"Error creating report","data":error});
						                          }
						                else{
						                      sails.log.info({"code":201,"response":"OK","method":"create","controller":"Report"});
						                      return res.send({"code":201,"message":"Create success" ,"data": [{id: report.id}]});
						                    }
						            });
						}
	                	else{
	                		sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Report"});
	                    	return res.send({"code":404, "message":'malformed parameters',"data":[]});
	                	}
	                }
	                else{
	                    sails.log.info({"code":404,"response":"WARNING","method":"finLamp","controller":"Command"});
	                    return res.send({"code":404, "message":'Lamp does not exist',"data":[]});
	                }
            	});
    	}
    },		
	
	
};


