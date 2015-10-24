//socket para comunicar constantemente el reporte de las lamparas

/*var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 1447 });
 
 //coneccion con el cliente
wss.on('connection', function connection(ws) {
  var myId = false;
 //una vez se establezca la conexion se esperan los datos 
 //enviados por el cliente 
  ws.on('message', function incoming(message) {
    message = (JSON.parse(message));
  	if(message.token === 'nose')
  		console.log('ENTRO');
    //console.log('received: %s', message.token);
  });

 ws.on('close', function() {
 	    clearInterval(id);
        //var client_info = {};
        //var toSend      = false;
        console.log('Stop Client');
    });
       
    var id = setInterval(function() {
    	temp = {}//sendParam('002');
      console.log(temp);
      console.log(JSON.stringify(temp));
             ws.send( JSON.stringify( temp ) ); 
     }, 400);


});*/

// index : func()`+{
// 	sails.controllers.lampara.findAll()
// 	lamapra.find()
// }

// function callback(cosa){
//   return cosa
// }

// sendParam(iden,function(iden,callback){  
//         result ={} 
//         limit= 3;
//         Report.find({where: {identifier:iden}, limit: limit, sort: 'finalDate DESC'})
//             .exec(function(error, report) {
//                     if (error){
//                       callback=result
//                     }
//                      else{
//                         callback=report
//                         return callback
                      
//                         sails.log.info({"code":200,"response":"OK","method":"findAll","controller":"Report"});
                      
//                     }
//             });
//      });
 
