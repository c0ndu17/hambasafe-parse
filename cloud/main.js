Parse.Cloud.define('create-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.define('get-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.beforeSave(Parse.User, function(req, res){
  console.log('Before Save');
  console.log(Parse.User);
  res.success();
})
Parse.Cloud.afterSave(Parse.User, function(req, res){
  console.log('Before Save');
  console.log(Parse.User);
  console.log(JSON.stringify(req));
  // res.success();
})
Parse.Cloud.beforeSave('Activity', function(req, res){
  if(!request.object){
    res.error('Invalid Activity Schema');
  }
  var waitTime = request.object.get('waitTime');
  var now = new Date();
  var startDate = new Date(request.object.get('startDate'));
  var endDate = new Date(request.object.get('endDate'));
  var author = request.object.get('author');
  var name  = request.object.get('name');
  var eventType  = request.object.get('eventType');
  var distance  = request.object.get('distance');
  if(isNaN(waitTime) || waitTime < 0){
    res.error('Invalid wait time');
  }ovar noew
  if(!endDate || endDate < Date.now()){
    res.error('Invalid end date');
  }
})
