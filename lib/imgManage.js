import fs from 'fs';
import glob from 'glob';

var ensureExists = function(path, mask, cb) {

  var fs = require('fs');

    if (typeof mask == 'function') { // allow the `mask` parameter to be optional
        cb = mask;
        mask = 0777;
    }
    fs.mkdir(path, mask, function(err) {
        if (err) {
            if (err.code == 'EEXIST' || err.code == 'ENOENT') cb(null); // ignore the error if the folder already exists
            else cb(err); // something else went wrong
        } else cb(null); // successfully created folder
    });
};


var mvAllImgServerNew = function(callback){

  var fs = require('fs');
  var glob = require('glob');

  if (forDeploy) {
    var oldPath = UPLOAD_DIR_SUBMIT;
    var newPath = UPLOAD_DIR;
  } else {
    var oldPath = BASE_DIR + UPLOAD_DIR_SUBMIT;
    var newPath = BASE_DIR + UPLOAD_DIR;
  }
  console.log("mvAllImgServerNew()");
  console.log("oldPath: " + oldPath);
  console.log("newPath: " + newPath);

  ensureExists(newPath, 0744, function(err) {
    if (err) {
      // handle folder creation error
      console.log("ERROR - ensureExists()");
      callback(err, null);
    } else {
      // we're all good

      var pattern = "+(*.jpg|*.jpeg|*.png|*.gif|*.JPG|*.JPEG|*.PNG|*.GIF)";
      var options = {"cwd": oldPath};

      glob(pattern, options, function (err, files) {
        if (err) {
          console.log("ERROR - glob()");
          callback(err, null);
        } else {
          console.log("files:" + files);
          if (files.length) {

            files.forEach(function(f) {

              var oldName = oldPath + f;
              var newName = newPath + f;

              var is = fs.createReadStream(oldName);
              var os = fs.createWriteStream(newName);

              is.pipe(os);
              is.on('end',function(err) {
                  fs.unlinkSync(oldName);

                  if (err) {
                    console.log("ERROR - fs.rename()");
                    callback(err, null);
                  } else {
                    console.log(oldName + " successfully moved to " + newName);
                    callback(null, 1); //1 means succeed, no error.
                  }

              });
              //
              // var rspFsMove = fs.rename(oldName, newName, function(err){
              //   if (err) {
              //       console.log("ERROR - fs.rename()");
              //       callback(err, null);
              //     } else {
              //       console.log(oldName + " successfully moved to " + newName);
              //       callback(null, 1); //1 means succeed, no error.
              //     }
              //   });
              });

/*
            console.log("files: ");
            console.log(files);

            for (var i = 0; i < files.length; i++){
              (function(i) {

                var oldName = oldPath + files[i];
                var newName = newPath + files[i];

                console.log("old: ");
                console.log(oldName);

                console.log("new: ");
                console.log(newName);


                var rspFsMove = fs.rename(oldName, newName, function(err){
                  if (err) {
                    console.log("ERROR - fs.rename()");
                    callback(err, null);
                  } else {
                    console.log(oldName + " successfully moved to " + newName);
                    callback(null, rspFsMove);
                  }
                });
              })(i);
            }

*/
          }
          else {
            console.log("Nothing to move");
            callback(null, 1);
          }
        }
      });

    }
  });

};







/*
var mvAllImgServer = function(callback){

  var fs = Meteor.npmRequire('fs');
  var glob = Meteor.npmRequire("glob");
  var localPath = "/Users/giy/oi-ticket/host_Uploads/";
  var newPath = "/Users/giy/oi-ticket/posted_Uploads/";

  var mvFunction = function(element, index, array){

    var oldName = localPath + element;
    var newName = newPath + element;

    ensureExists(newPath, 0744, function(err) {
      if (err) {
        // handle folder creation error
        callback(err, null);
      } else {
        // we're all good
        var rspFsMove = fs.rename(oldName, newName, function(err){
          if (err) {
            callback(err, null);
          } else {
            console.log(oldName + " successfully moved to " + newName);
            callback(null, rspFsMove);
          }
        });
      }
    });
  };


  var pattern = "+(*.jpg|*.jpeg|*.png|*.gif|*.JPG|*.JPEG|*.PNG|*.GIF)";
  var options = {"cwd": localPath};

  glob(pattern, options, function (err, files) {
    if (err) {
      callback(err, null);
    } else {
      if (files.length == 0) {
        console.log("No matched files : " + pattern);
      } else {

        ensureExists(newPath, 0744, function(err) {
          if (err) {
            // handle folder creation error
            callback(err, null);
          } else {
            // we're all good
            // files.forEach(mvFunction);

            for (var i = 0; i < files.length; i++){


              files[i]
            }
          }
        });
      };

      }
    }
  });

};

*/

var delAllImgServer_upload = function(img_Id, callback){

  var fs = require('fs');
  var glob = require('glob');

  if (forDeploy) {
    var oldPath = UPLOAD_DIR; // "/Users/giy/oi-ticket/host_Uploads";
  } else {
    var oldPath = BASE_DIR + UPLOAD_DIR; // "/Users/giy/oi-ticket/host_Uploads";
  }

  var unlinkFunction = function(element, index, array){
    var file = oldPath + element;
    var rspFsDelete = fs.unlink(file, function(err){
      if (err) {
        callback(err, null);
      } else {
        console.log("successfully deleted " + file);
        callback(null, rspFsDelete);
      }
    });
  };


  /* +(pattern|pattern|pattern) */
  var pattern = img_Id + "+(*.jpg|*.jpeg|*.png|*.gif|*.JPG|*.JPEG|*.PNG|*.GIF)";
  var options = {"cwd": oldPath};

  glob(pattern, options, function (err, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // err is an error object or null.
    if (err) {
      callback(err, null);
    } else {
      if (files.length == 0) {
        console.log("No matched files : " + pattern);
        callback(null, 0); //0 means not error, but abnormal.
      } else {
        files.forEach(unlinkFunction);
      }
    }
  });

};


var delAllImgServer = function(callback){

  var fs = require('fs');
  var glob = require('glob');

  if (forDeploy) {
    var oldPath = UPLOAD_DIR_SUBMIT;
  } else {
    var oldPath = BASE_DIR + UPLOAD_DIR_SUBMIT;
  }
  console.log("delAllImgServer()");
  console.log("oldPath: " + oldPath);

  var unlinkFunction = function(element, index, array){
    var file = oldPath + element;
    var rspFsDelete = fs.unlink(file, function(err){
      if (err) {
        callback(err, null);
      } else {
        console.log("successfully deleted " + file);
        callback(null, rspFsDelete);
      }
    });
  };


  /* +(pattern|pattern|pattern) */
  var pattern = "+(*.jpg|*.jpeg|*.png|*.gif|*.JPG|*.JPEG|*.PNG|*.GIF)";
  var options = {"cwd": oldPath};

  glob(pattern, options, function (err, files) {
    // files is an array of filenames.
    // If the `nonull` option is set, and nothing
    // was found, then files is ["**/*.js"]
    // err is an error object or null.
    if (err) {
      callback(err, null);
    } else {
      if (files.length == 0) {
        console.log("No matched files : " + pattern);
      } else {
        files.forEach(unlinkFunction);
      }
    }
  });

};



var delImgServer = function(file, callback){

  console.log("delImgServer()");
  console.log(file);

  var fs = require('fs');

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

  console.log("renameImgServer()");
  console.log(file);
  console.log(newName);

  var fs = require('fs');

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
};



Meteor.methods({

  moveAllImg: function () {
    if (Meteor.isServer) {
      console.log("try mvAllImg!!");
      this.unblock();
      // var response = Meteor.wrapAsync(mvAllImgServer)();
      var response = Meteor.wrapAsync(mvAllImgServerNew)();
      console.log(response);
      return response;
    }
  },

  deleteImg: function (file) {
    if (Meteor.isServer) {
      console.log("try rename!!");
      this.unblock();
      var response = Meteor.wrapAsync(delImgServer)(file);
      console.log(response);
      return response;
    }
  },

  // Delete files UPLOAD_DIR
  deleteAllImg_uploaded: function (img_Id) {
    if (Meteor.isServer) {
      console.log("try deleteAllImg_uploaded!!");
      this.unblock();
      var response = Meteor.wrapAsync(delAllImgServer_upload)(img_Id);
      console.log(response);
      return response;
    }
  },

  // Delete files UPLOAD_DIR_SUBMIT
  deleteAllImg: function () {
    if (Meteor.isServer) {
      console.log("try delAllImg!!");
      this.unblock();
      var response = Meteor.wrapAsync(delAllImgServer)();
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
