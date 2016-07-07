var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');
module.exports = function(app) {
  console.log('Loading EVENTS endpoints');
  const EVENTS_ROOT = '/v1/Events';

  app.route(EVENTS_ROOT + '/create-event')
  .post(function(req, res){
      res.json({
      });
    })

















  createEvent = (req, error) => {
     
  }
  event = (req, error) => {
     
  }
  events = (req, error) => {
     
  }
  eventsBySuburb = (req, error) => {
     
  }
  eventsByCoordinates = (req, error) => {
     
  }

  endpointHandler = (req, error) => {
    switch(req.endpoint){
      case 'createEvent':
        createEvent(req, error);
        break;
      case 'event':
        event(req, error);
        break;
      case 'events':
        events(req, error);
        break;
      case 'eventsBySuburb':
        eventsBySuburb(req, error);
        break;
      case 'eventsByCoordinates':
        eventsByCoordinates(req, error);
        break;
      default:
       error('EVENTS', 'Invalid endpoint!');
    }
  }
  
  return {
    endpointHandler,
  }
}
