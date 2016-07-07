const _ = require('lodash');
module.exports = function(r){

  const requiredTables = {
    'AuthData'    :   createAuthData,
    'User'        :   createUser,
    'Activity'    :   createActivity,
    'ActivityType':   createActivityType,
    'Place'         :   createPlace,
    'Tag'         :   createTag,
  }

  r.tableList().run((err, result) => {
    console.log(result);
    let toCreate = _.omit(requiredTables, result)
    console.log(toCreate);
    _.forIn(toCreate, (func, key)=> {
      console.log(func);
      func(r);
    })
  })

  function createAuthData(r) {
    r.tableCreate('AuthData', {
    }).run(function(err, result){
      //TODO: HANDLE FAIL
      // console.log(err);
      // console.log(result);
      r.table("User").indexCreate("email").run(function(result) {
        
      })
    })
  }
  function createUser(r) {
    r.tableCreate('User', {
    }).run(function(err, result){
      //TODO: HANDLE FAIL
      console.log(result);
      r.table("User").indexCreate("email").run(function(result) {
        //TODO: HANDLE FAIL
        r.table("User").indexCreate("firstName").run(function(result) {
          //TODO: HANDLE FAIL
          r.table("User").indexCreate("lastName").run(function(result) {
            //TODO: HANDLE FAIL

          })
        })
      })
      console.log(result);
    })
  }

  function createActivity(r){
    //create Tables;
    r.tableCreate('Activity').run(function(err, result){
      //TODO: HANDLE FAIL
      r.table("Activity").indexCreate("name").run(function(result){
        //TODO: HANDLE FAIL
        r.table("Activity").indexCreate("startLocation", {geo : true }).run(function(result){
          //TODO: HANDLE FAIL
          r.table("Activity").indexCreate("endLocation", {geo : true }).run(function(result){
            //TODO: HANDLE FAIL
            r.table("Activity").indexCreate("ownerUser").run(function(result){
              //TODO: HANDLE FAIL

            })
          })
        })
      })
      console.log(result);
    })
  }
  function createActivityType(r){
    r.tableCreate('ActivityType').run(function(err, result){
      r.table("ActivityType").indexCreate("name").run(function(result){
      })
    })
  }

  function createPlace(r){
    r.tableCreate('Place').run(function(err, result){
      //TODO: HANDLE FAIL
      r.table("Place").indexCreate("location", {geo : true}).run(function(result){
        //TODO: HANDLE FAIL
        r.table("Place").indexCreate("country").run(function(result){
          r.table("Place").indexCreate("city").run(function(result){
            //TODO: HANDLE FAIL
            r.table("Place").indexCreate("suburb").run(function(result){
              //TODO: HANDLE FAIL

            })

          })
        })

      }),
      console.log(result);
    })
  }

  function createTag(r){
    r.tableCreate('Tag', {
      primaryKey: 'name'
    }).run(function(err, result){
      //TODO: HANDLE FAIL
      console.log(result);
    })
  }

}
