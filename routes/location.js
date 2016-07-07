var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');
module.exports = function(r) {

  console.log('Loading LOCATIONS endpoints');

  location = (req, errorHandler, respHandler) => {
     
  }

  locations = (req, errorHandler, respHandler) => {
     
  }

  locationsBySuburb = (req, errorHandler, respHandler) => {
     
  }

  endpointHandler = (req, errorHandler, respHandler) => {
    switch(req.endpoint){
      case 'location':
        locations(req, errorHandler, respHandler);
      case 'locations':
        locations(req, errorHandler, respHandler);
      case 'locationsBySuburb':
        locationsBySuburb(req, errorHandler, respHandler);
      default:
       error('LOCATIONS', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
