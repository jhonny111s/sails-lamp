/**
* Lamp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection : 'posgrestLocal',
	// adquiere datos de model.js defecto de conexion.
    tableName       : 'lamp',

    // esquema a utilizar para el modelo de cliente
  //  meta: {
    //    schemaName  : 'prueba'
    //},

  attributes: {

    identifier :{
  	 type: 'string',
  	 required: true
  	},

 	  name :{
  	 type: 'string',
  	 required: true
  	},
 
  	description :{
  	 type: 'text'
  	},

  	location :{
  	 type: 'json',
  	 required: true
  	},

  	type :{
  	 type: 'boolean'
  	},
  }
};


