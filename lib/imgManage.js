var delImgServer = function(file, callback){

  var fs = Meteor.npmRequire('fs');

  var rspFsDelete;
  var rspFsExist = fs.exists(file, function(exists) {
    if(exists) {
      console.log(file + ' exists. Deleting now ...');    

      rspFsDelete = fs.unlink(file, function(err){
        if (err) {
          callback(err, null);
        } else {
          console.log("successfully deleted " + file);
          callback(null, rspFsDelete);
        }
      });
    } else {
      console.log(file + 'File not found, can not delete it.');
      callback(rspFsExist, null);
    }
  });
};


var renameImgServer = function(file, newName, callback){

  console.log(file);
  console.log(newName);

  var fs = Meteor.npmRequire('fs');

  var rspFsRename;
  var rspFsExist = fs.exists(file, function(exists) {
    if(exists) {
      console.log(file + ' exists. Rename it now ...');    

      rspFsRename = fs.rename(file, newName, function (err) {
        if (err){
          callback(err, null);
        } else {
          console.log('renamed complete');
          callback(null, rspFsRename);
        }
      }); 
      
    } else {
      console.log(file + 'File not found, can not rename it.');
      callback(rspFsExist, null);
    }
  });


  // try{
  //   var response = HTTP.get(url, {
  //     auth : 'morfant:' + MAILCHIMP_API_KEY
  //   }).data;
  //   callback(null, response);

  // }catch (error){
  //   if (error.response) {
  //     var errorCode = error.response.data.code;
  //     var errorMessage = error.response.data.message;
  //   // Otherwise use a generic error message
  //   } else {
  //     var errorCode = 500;
  //     var errorMessage = 'Cannot access the API';
  //   }
  //   // Create an Error object and return it via callback
  //   var myError = new Meteor.Error(errorCode, errorMessage);
  //   callback(myError, null);
  // } 


};



Meteor.methods({

  deleteImg: function (file) {
    if (Meteor.isServer) {
      console.log("try rename!!");
      this.unblock();
      var response = Meteor.wrapAsync(delImgServer)(file);
      console.log(response);
      return response;
    }
  },

  renameImg: function (file, newName) {
    if (Meteor.isServer) {
      console.log("try rename!!");
      this.unblock();
      var response = Meteor.wrapAsync(renameImgServer)(file, newName);
      console.log("response!");
      console.log(response);
      return response;
    }
  }


});