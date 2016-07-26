Parse.Cloud.define('create-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.define('get-user', function(req, res) {
  console.log('here');
})
Parse.Cloud.beforeSave(Parse.User, function(req, res){
  console.log('Before Save');
  var user = req.user;
  // if(req.object.get('objectId') !== user.get('objectId')){
  //   res.error('You cannot edit another user, the attempt has been logged');
  //   return;
  // }
  // if(req.object.get('trust') !== user.get('trust')) {
  //   res.error(); 
  //   return; 
  // }
  // if(req.object.get('rating') !== user.get('rating')) {
  //   res.error(); 
  //   return; 
  // }
  // if(req.object.get('verified') !== user.get('verified')) {
  //   res.error(); 
  //   return; 
  // }
  // if(req.object.get('emailVerified') !== user.get('emailVerified')) {
  //   res.error();
  //   return; 
  // }
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
  if(!!req.object.get('firstName')){
    req.object.set('firstName', req.object.get('firstName').toLowerCase());
  }
  if(!!req.object.get('lastName')){
    req.object.set('lastName', req.object.get('lastName').toLowerCase());
  }
  if(!!req.object.get('firstName') && !!req.object.get('lastName')){
    req.object.set('fullname', req.object.get('firstName') + " " + req.object.get('lastName'))
  }
  res.success();

})
Parse.Cloud.afterSave(Parse.User, function(req, res){
  console.log('Before Save');
  console.log(Parse.User);
  console.log(JSON.stringify(req));
  // res.success();
})
Parse.Cloud.beforeSave('Activity', function(req, res){
  if(!req.object) {
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
  var startLocation  = data.get('startLocation');
  // var endLocation  = data.get('endLocation');
  var intensity  = data.get('intensity');
  var isPublic  = data.get('isPublic');
  if(isNaN(waitTime) || waitTime < 0 || waitTime > 30) {
    res.error('Invalid wait time');
    return;
  }
  if(!startDate || Date.now() >= startDate.getTime() - 60*60000) {
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
  if(author.get('objectId') !== req.user.get('objectId')){
    res.error('You cannot create on behalf of another user, the attempt has been logged');
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

  // if(!endLocation || Math.abs(endLocation.longitude) >= 180 || Math.abs(endLocation.latitude) >= 180 ) { //TODO: END LOCATION VALIDATION
  //   res.error('Invalid endLocation');
  // } 
  // else {
  //   req.object.set('endLocation' , new Parse.GeoPoint(endLocation)) 
  // }
  if(!intensity || !(intensity === 'NOVICE' || intensity === 'INTERMEDIATE' || intensity === 'INTENSE')) {
    res.error('Invalid intensity');
    return;
  }
  if(isPublic === undefined || typeof(isPublic) !== 'boolean') {
    res.error('Invalid isPublic');
    return;
  }
  if(!startLocation) { //TODO: START LOCATION VALIDATION
    res.error('Invalid startLocation');
    return;
  }
  console.log('SUCCESSFUL FIELDS');
  // var LocationClass = Parse.Object.extend('Location');
  // var locationObj = new LocationClass();
  // location.set('coordinates', new Parse.GeoPoint(startLocation));
  // locationObj(null, {
  //   success: function(response){
  //     console.log(response);
  //     res.object.set('startLocation', response);
  res.success();
    // },
    // error: function(err){
    //   console.log('error');
    //   console.log(err);
    //   res.success();
    // }
  // })
})
Parse.Cloud.beforeSave('Attendance', function(req, res){
  var attendanceQuery = new Parse.Query('Attendance');
  if(!req.object.get('userReference') && req.object.get('userReference') !== req.user.get('objectId')) {
    res.error('You cannot create on behalf of another user, the attempt has been logged');
    return;
  }
  attendanceQuery.equalTo('activityReference', req.object.get('activityReference'));
  attendanceQuery.equalTo('userReference', req.object.get('userReference'));
  attendanceQuery.find({
    success: function(objects) {
      if(objects.length){
        res.error('Already joined');
        return;
      }
      res.success();
    },
    error: function(err) {
      console.log(err);
      res.success();
    },
  })
})
Parse.Cloud.beforeSave('Location', function(req, res){
  if(!req.object) {
    res.error('Invalid Location Schema');
  }
  var data = req.object;
  var coords = data.get('coordinates');
  // var latitude = data.get('latitude');
  // if(!longitude || typeof(longitude) != 'number' || Math.abs(longitude) > 180) {
  //   res.error('Invalid Longitude Schema');
  //   return;
  // }
  // if(!latitude || typeof(latitude) != 'number' || Math.abs(latitude) > 90) {
  //   res.error('Invalid Latitude Schema');
  //   return;
  // }

  // var LocationClass =  Parse.Object.extend('Location');
  // req.object.unset('longitude');
  // req.object.unset('latitude');
  Parse.Cloud.httpRequest({
    method: "GET",
    url: 'https://api.what3words.com/v2/reverse',
    params: {
      coords: coords.latitude + ',' + coords.longitude,
      key:"Q1EQTM62",
      lang: 'en',
      format:'json',
      display: 'full',
    },
    success: function(httpResponse) {
      var response = httpResponse.data;
      if(response.status.reason == "OK") {
        var query = new Parse.Query('Location');
        // query.near('coordinates', locationCoords);
        query.limit(1);
        query.equalTo('tileWords', response.words)
        query.find({
          success:function(object) {
            // console.log(object);
            // if(object[0] &&(object[0].get('coordinates').latitude == locationCoords.latitude || object[0].get('coordinates').longitude == locationCoords.longitude)) {
            //   console.log('Location exists');
            //   res.error('Location exists');
            //   return;
            //   }
            console.log('object');
            if(object.length != 0) {
              res.error({message:'DUPLICATE', object: object[0]});
              return;
            }
            req.object.set('tileWords', response.words);

            Parse.Cloud.httpRequest({
              method: "POST",
              url: 'https://maps.googleapis.com/maps/api/geocode/json',
              params: {
                latlng: coords.latitude + ',' + coords.longitude,
                key:"AIzaSyCQ0u4GtkkD7or6QXcUYASZxN0uOeJ2bVM"
              },
              success: function(httpResponse) {
                var response = httpResponse.data;
                if(response.status == "OK") {
                  // req.object.set('coordinates', locationCoords);
                  var address = response.results[0];
                  for(var i = 0; i < address.address_components.length; i++) {
                    var component = address.address_components[i];
                    console.log(component);
                    for(var j = 0; j < component.types.length; j++) {
                      switch(component.types[j]) {
                        case 'street_number':
                          req.object.set('streetNumber', component.long_name);
                        break;
                        case 'route':
                          req.object.set('streetName', component.long_name);
                        break;
                        case 'sublocality_level_2':
                          req.object.set('suburb', component.long_name);
                        break;
                        case 'administrative_area_level_2':
                          req.object.set('city', component.long_name);
                        break;
                        case 'administrative_area_level_1':
                          req.object.set('administrativeArea', component.long_name);
                        break;
                        case 'country':
                          req.object.set('country', component.long_name);
                        break;
                        case 'postal_code':
                          req.object.set('postCode', component.long_name);
                        break;
                      }
                    }
                  }
                  console.log(JSON.stringify(req.object.toJSON()));
                  // Parse.Cloud.
                  res.success();
                } else {
                  res.error();
                }
              },
              error: function(httpResponse) {
                console.log(httpResponse);
                console.error('Request failed with response code ' + httpResponse.status);
              }
            });
          },
          error: function(httpResponse) {
            console.log('OHH no');
            console.log(httpResponse);
            console.error('Request failed with response code ' + httpResponse.status);
          }
        });
      }
    },
    error: function(object, error){
      console.log('ERROR');
      console.log(object);
      console.error(error);
      res.success(error);
    }
  })
})


Parse.Cloud.beforeSave("Rating", function(req, res) {
  if (req.object.get("stars") < 1) {
    res.error("you cannot give less than one star");
  } else if (req.object.get("stars") > 5) {
    res.error("you cannot give more than five stars");
  } else {
    res.success();
  }
});

Parse.Cloud.define("checkLocationExists", function(req, res){
  var query = new Parse.Query('Location');
  Parse.Cloud.httpRequest({
    method: "GET",
    url: 'https://api.what3words.com/v2/reverse',
    params: {
      coords: req.params.latitude + ',' + req.params.longitude,
      key:"Q1EQTM62",
      lang: 'en',
      format:'json',
      display: 'full',
    },
    success: function(httpResponse) {
      var response = httpResponse.data;
      if(response.status.reason == "OK") {
        query.equalTo('tileWords', response.words)
        query.find({
          success: function(object) {
            console.log('object');
            if(object.length != 0) {
              res.success({exists: true, obj: object[0]});
              return;
            }
            res.success({exists: false});
          },
          error: function(object, error){
            console.log('ERROR');
            console.log(object);
            console.error(error);
            res.success(error);
          }
        })
      }
    },
    error: function(object, error){
      console.log('ERROR');
      console.log(object);
      console.error(error);
      res.success(error);
    }
  })
})

