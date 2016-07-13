Parse.Cloud.define('create-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.define('get-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.beforeSave(Parse.User, function(req, res){
  console.log('Before Save');
  console.log(Parse.User);
  // if(!req.object){
  //   res.error('Invalid Activity Schema');
  // }
  // var data =req.object;
  // var firstName   = data.get('firstName');
  // var lastName    = data.get('lastName');
  // if(!firstName){
  //   res.error('please enter your first name');
  //   return;
  // }
  // if(!lastName){
  //   res.error('please enter your last name');
  //   return;
  // }
  res.success();
  
})
Parse.Cloud.afterSave(Parse.User, function(req, res){
  console.log('Before Save');
  console.log(Parse.User);
  console.log(JSON.stringify(req));
  // res.success();
})
Parse.Cloud.beforeSave('Activity', function(req, res){
  if(!req.object){
    res.error('Invalid Activity Schema');
  }
  var data =req.object;
  var waitTime = data.get('waitTime');
  var now = new Date();
  var startDate = new Date(data.get('startDate'));
  // var endDate = new Date(data.get('endDate'));
  var name  = data.get('name');
  var description  = data.get('description');
  var author = data.get('author');
  var eventType  = data.get('eventType');
  var distance  = data.get('distance');
  console.log(distance);
  var startLocation  = data.get('startLocation');
  // var endLocation  = data.get('endLocation');
  var intensity  = data.get('intensity');
  var isPublic  = data.get('isPublic');
  if(isNaN(waitTime) || waitTime < 0 || waitTime > 30) {
    res.error('Invalid wait time');
    return;
  }
  if(!startDate || startDate < Date.now()) {
    res.error('Invalid startDate');
    return;
  }
  // if(!endDate || endDate < startDate) {
  //   res.error('Invalid endDate');
  //   return;
  // }
  if(!name || name.length < 3 || name.length > 40) {
    res.error('Invalid name');
    return;
  }
  if(!description || description.length < 30 || description.length > 400) {
    res.error('Invalid description');
    return;
  }
  if(!author) {//TODO: extend cannot create event at the same time as another;
    res.error('Invalid author');
    return;
  }
  if(!eventType || !(eventType === 'RUN' || eventType === 'WALK' || eventType === 'CYCLE')) {
    res.error('Invalid eventType');
    return;
  }
  if(!distance || isNaN(distance) || distance < 0 || distance > 150) {
    res.error('Invalid distance');
    return;
  }
  if(!startLocation) { //TODO: START LOCATION VALIDATION
    res.error('Invalid startLocation');
    return;
  }
  // else {
  //   req.object.set('startLocation' , new Parse.GeoPoint(startLocation)) 
  // }
  // if(!endLocation || Math.abs(endLocation.longitude) >= 180 || Math.abs(endLocation.latitude) >= 180 ) { //TODO: END LOCATION VALIDATION
  //   res.error('Invalid endLocation');
  // } 
  // else {
  //   req.object.set('endLocation' , new Parse.GeoPoint(endLocation)) 
  // }
  if(!intensity || !(intensity === 'NOVICE' || intensity === 'INTERMEDIATE' || intensity === 'HARDCORE')) {
    res.error('Invalid intensity');
    return;
  }
  if(isPublic === undefined || typeof(isPublic) !== 'boolean') {
    res.error('Invalid isPublic');
    return;
  }
  console.log('SUCCESSFUL FIELDS');
  res.success();
})

// Parse.Cloud.afterSave('Activity', function(req, res){
//   res.success()
// });
