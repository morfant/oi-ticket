var delImgServer = function(file, callback){

  var fs = Meteor.npmRequire('fs');

    fs.exists(file, function(exists) {
      if(exists) {
        console.log(file + ' exists. Deleting now ...');    
        fs.unlink(file, function(error){
            if (error) throw error;
            console.log("successfully deleted " + file);
        });
      } else {
        console.log(file + 'File not found, can not delete it.');
      }
    });
};


var renameImgServer = function(file, newName, callback){

  console.log(file);
  console.log(newName);

  var fs = Meteor.npmRequire('fs');

    fs.exists(file, function(exists) {
      if(exists) {
        console.log(file + ' exists. Rename it now ...');    

       fs.rename(file, newName, function (err) {
        if (err) throw err;
          console.log('renamed complete');
        }); 
      } else {
        console.log(file + 'File not found, can not rename it.');
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
  },

  renameImg: function (file, newName) {
    if (Meteor.isServer) {
      this.unblock();
      var response = Meteor.wrapAsync(renameImgServer)(file, newName);
      return response;
    }
  }


});