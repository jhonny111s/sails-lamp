/**
* Report.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
   //connection : 'mongoProduction',
    tableName       : 'report',

  attributes: {

    identifier :{
  	type: 'string',
  	required: true
  	},

 	parameters :{
  	type: 'json',
  	required: true
  	},

  	finalDate :{
  	type: 'datetime'
  	},

  },

};

