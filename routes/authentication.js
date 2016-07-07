var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');
module.exports = function(r) {
  console.log('Loading AUTHENTICATION endpoints');

  externalLogin = (req, errorHandler, respHandler) => {
  }

  endpointHandler = (req, errorHandler, respHandler) => {
    switch(req.endpoint){
      case 'externalLogin':
        externalLogin(req, errorHandler, respHandler);
      break;
      default:
       error('AUTHENTICATION', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
