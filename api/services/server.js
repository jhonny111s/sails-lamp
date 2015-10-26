//socket para comunicar constantemente el reporte de las lamparas

var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 1447 });
 
 //coneccion con el cliente
wss.on('connection', function connection(ws) {
  var myId = false;
  console.log(ws._socket);
 //una vez se establezca la conexion se esperan los datos 
 //enviados por el cliente 
  ws.on('message', function incoming(message) {
    message = (JSON.parse(message));
  	if(message.token === 'nose3')
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
        sendParam('002',ws);
     }, 400);


});


function sendParam(iden,ws){  
        result ={} 
        Report.find({where: {identifier:iden}, limit: '1', sort: 'finalDate DESC'})
            .exec(function(error, report) {
                    if (error){
                       ws.send( JSON.stringify(result ) );
                    }
                     else{
                        result=report
                        ws.send( JSON.stringify(result ) );                      
                    }
            });
     };
 
