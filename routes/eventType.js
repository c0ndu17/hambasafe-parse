var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');
module.exports = function(r) {
  console.log('Loading EVENTTYPES endpoints');

  eventTypes = (req, errorHandler, respHandler) =>{
  
  }

  endpointHandler = (req, errorHandler, respHandler) => {
    switch(req.endpoint){
      case 'eventTypes':
        eventTypes(req, errorHandler, respHandler);
      default:
       error('EVENTTYPES', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
