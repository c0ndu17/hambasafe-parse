var bcrypt    = require('bcrypt-nodejs');
var jwt       = require('jwt-simple');
var _         = require('lodash');

module.exports = function(app, upload) {
  console.log('Loading USERS endpoints');
  const USERS_ROOT = '/v1/Users';

  app.route(USERS_ROOT + '/create-user')
  .post(function(req, res){
      res.json({
        'success' : true
      });
    })


































  var userModel = {
    'avatar'      : 'string',
    'firstName'   : 'string',
    'lastName'    : 'string',
    'gender'      : 'string',
  }

  var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  var genderKeys = [
    'male', 
    'female',
    'other'
  ]
  function validUserModel(userData){
    if(!userData || typeof(userData) != 'object') {
      return 'Invalid User Object';
    }
    //TODO: extend validation
    if(!userData.avatar || typeof(userData.avatar) != 'string'){
      return 'Invalid avatar'; 
    }
    if(!userData.firstName || typeof(userData.firstName) != 'string' || !/^[A-Za-z'-]+$/.test(userData.firstName)){
      return 'Invalid firstname'; 
    }
    if(!userData.lastName || typeof(userData.lastName) != 'string' || !/^[A-Za-z'-]+$/.test(userData.lastName)) {
      return 'Invalid Lastname'; 
    }
    if(!userData.email || typeof(userData.email) != 'string' || !emailRegex.test(userData.email) || userData.email !== userData.confirmEmailAddress) {
      return 'Invalid Email';
    }
    if(!userData.gender || typeof(userData.gender) != 'string' || _.indexOf(genderKeys, userData.gender) === -1) {
      return 'Invalid Gender';
    }
    if(!userData.location || typeof(userData.location) != 'object' || !userData.location.longitude || !userData.location.latitude) {
      return 'Invalid Location';
    }
    //XXX: Age Requirement?
    var testDate = new Date(userData.dateOfBirth);
    console.log(testDate);
    console.log(typeof(testDate));
    if(!testDate || typeof(testDate) !== 'object' || testDate >= Date.now()) {
      return 'Invalid Date of Birth';
    }
    if(!userData.mobileNumber || typeof(userData.mobileNumber) != 'string' || /^(\+\d{1,3}[- ]?)?\d{9}$/.test(userData.mobileNumber)) {
      return 'Invalid Mobile Number';
    }
    return undefined;
  }
  createUser = (req, errorHandler, respHandler) =>{
    var resData = {};
    var retValid = validUserModel(req.data);
    if( typeof(retValid) == 'string' ) {
      console.log('Error in User Model\n' + retValid);
      errorHandler('USERS', retValid);
      return; 
    }
    req.data['verified'] = 0;
    req.data = _.omit(req.data, 'confirmEmailAddress');
  }
  updateUser = (req, errorHandler, respHandler) => {
    req.data = _.omit(req.data, 'verified');
    // r.table('User').filter(req.data).run((err, result) => {
    // })
  }
  uploadIdentification = (req, errorHandler, respHandler) =>{
  
  }
  users = (req, errorHandler, respHandler) =>{
  
  }
  usersByName = (req, errorHandler, respHandler) =>{
    console.log('usersByName');
    if(req && req.data) {
      // TODO: Uncomment -> Only query for verified fields;
      // req.data.verified = 1;

    }
  }
  user = (req, errorHandler, respHandler) =>{
  }
  var endPoints = {
    'createUser': createUser,
    'updateUser': updateUser,
    'uploadIdentification': uploadIdentification,
    // 'users': users,
    'usersByName': usersByName,
    'user': user,
  }
  endpointHandler = (req, errorHandler, respHandler) => {
     endPoints[req.endpoint] ? endPoints[req.endpoint](req, errorHandler, respHandler) : errorHandler('USERS', 'Invalid endpoint!');
     return true;//TODO:
  }
  
  return {
    endpointHandler,
  }
}
