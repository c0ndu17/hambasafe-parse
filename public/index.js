Socket = io('wss://localhost:3000');
function createUser(){
  console.log('createUser');
  var newUser = {
    'avatar'              : 'http://i.imgur.com/AmAM5Dx.jpg',
    'firstName'           : 'george',
    'lastName'            : 'phillips',
    'gender'              : 'male',
    'dateOfBirth'         : new Date(),
    'mobileNumber'        : '0828374743',
    'email'               : 'hi@lameco.co.za',
    'confirmEmailAddress' : 'hi@lameco.co.za',
    'location'            : {
      'latitude'    : -33.9249,
      'longitude'   : 18.4241,
    }
  }
  var req = {
    type : 'USERS',
    endpoint: 'createUser',
    data : newUser,
  }
  Socket.emit('action', req)
}

function queryName(){
  console.log('queryName');
  var query = {
    'firstName'           : 'george',
  }
  var req = {
    type      : 'USERS',
    endpoint  : 'usersByName',
    data      : query,
  }
  Socket.emit('action', req)
}
Socket.on('SOCKET_RESPONSE', function(res) {
  console.log(res);
})
Socket.on('SOCKET_ERROR', function(res) {
  console.log(res);
})
