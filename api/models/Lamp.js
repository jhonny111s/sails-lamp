/**
* Lamp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	//connection : 'posgrestLocal',
	// adquiere datos de model.js defecto de conexion.
   //connection : 'mongoProduction',
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

  	privated :{
  	 type: 'boolean'
  	},

    user_name :{
      type: 'string',
      required : true
    },

      toJSON: function() {
      var obj = this.toObject();
      delete obj.identifier;
      delete obj.location;
      delete obj.description;
      delete obj.user_name;
      delete obj.privated;
      return obj;
    },

  },

};


