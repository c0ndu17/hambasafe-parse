var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');
module.exports = function(r) {
  console.log('Loading INVITATIONS endpoints');

  createInvitation = (req, errorHandler, respHandler) =>{
     
  }
  invitee = (req, errorHandler, respHandler) =>{
     
  }
  invitor = (req, errorHandler, respHandler) =>{
     
  }
  endpointHandler = (req, errorHandler, respHandler) => {
    switch(req.endpoint){
      case 'createInvitation': 
        createInvitation(req, errorHandler, respHandler);
      case 'createInvitation': 
        invitee(req, errorHandler, respHandler);
      case 'createInvitation': 
        invitor(req, errorHandler, respHandler);
      default:
       error('INVITATIONS', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
