module.exports = function isAuth (req, res, next) {

var APPROVED_API_KEY = process.env.APPROVED_API_KEY || '';

  if(process.env.APPROVED_API_KEY == req.param('token'))
    next();
  else
  res.send({"code":401, "message":"Invalid autentication"});


  };

