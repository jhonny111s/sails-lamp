/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  //connection : 'mongoProduction',
  tableName       : 'user',


  attributes: {

    username :{
  	 type: 'string',
  	 required: true
  	},

  	admin : {
  		type: 'boolean'
  	},

  	active : {
  		type : 'boolean'

  	}
  }
  
};

