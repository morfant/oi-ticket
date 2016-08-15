var delImgServer = function(file, callback){

  var fs = Meteor.npmRequire('fs');

    fs.exists(target, function(exists) {
      if(exists) {
        console.log(target + ' exists. Deleting now ...');    
        fs.unlink(target, function(error){
            if (error) throw error;
            console.log("successfully deleted " + target);
        });
      } else {
        console.log(target + 'File not found, so not deleting.');
      }
    });
};


Meteor.methods({

  deleteImg: function (file) {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(delImgServer)(file);
      return response;
    }
  }


});