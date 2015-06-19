module.exports = function isAuth (req, res, next) {

var APPROVED_API_KEY = process.env.APPROVED_API_KEY || '';

if (!req.param('token')) {
      res.send(400, "error de autenticación");
    }
else{
  if(process.env.APPROVED_API_KEY == req.param('token'))
    next();
  else
  res.send(400, "error de autenticación");

}

  };

