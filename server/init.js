var im = Meteor.npmRequire('imagemagick');


forDeploy = false;

var _tmpDir, _uploadDir;

if (forDeploy){
  _tmpDir = UPLOAD_DIR_TMP;
  _uploadDir = UPLOAD_DIR;
} else {
  _tmpDir = process.env.PWD + UPLOAD_DIR_TMP;
  _uploadDir = process.env.PWD + UPLOAD_DIR;
}


Meteor.startup(function () {

  UploadServer.init({

    tmpDir: _tmpDir,
    uploadDir: _uploadDir,
    checkCreateDirectories: true,
    overwrite: true,
    // getDirectory: function(fileInfo, formData) {
    //   // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
    //   // return formData.contentType;
    //   return '/';
    // },
 
    // getFileName: function(fileInfo, formData) { //if this function not defined, file saved as it's original name.
    //   console.log(fileInfo);
    //   return formData.imgID;
    // },

    finished: function(fileInfo, formFields) {
      // perform a disk operation
      // console.log(fileInfo);

      // var targetImg = _uploadDir+'/fullWidth/'+fileInfo.name;
      // var dimension = {};

      // im.identify(targetImg, function(err, output){
      //   if (err) throw err;
      //     // console.log('width: '+output.width);
      //     dimension.width = output.width;
      //     dimension.height = output.height;
      //     //TO DO: get fullWidth image size instead original size.
      //     // console.log("dimension: "+dimension.width+" / "+dimension.height);
      //   });

      // fileInfo.dimension = dimension;
      fileInfo.filepath = _uploadDir;

    },
    imageVersions: {
      fullWidth: {width: 960, height: 960},
      thumbnailBig: {width: 400, height: 300},
      thumbnailSmall: {width: 200, height: 100}
    },
    cacheTime: 100,
    mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
    }
  });


  
});