var im = Meteor.npmRequire('imagemagick');

Meteor.startup(function () {

  UploadServer.init({

    tmpDir: process.env.PWD + '/host_Uploads/tmp/',
    uploadDir: process.env.PWD + '/host_Uploads/',
    overwrite: true,
    // tmpDir: '/host_Uploads/tmp/',
    // uploadDir: '/host_Uploads/',    
    checkCreateDirectories: true,
    getDirectory: function(fileInfo, formData) {
      // create a sub-directory in the uploadDir based on the content type (e.g. 'images')
      // return formData.contentType;
      return '/';
    },
    // getFileName: function(fileInfo, formData) { //if this function not defined, file saved as it's original name.
      // console.log(formData);
      // return formData.imgID;
    // },
    finished: function(fileInfo, formFields) {
      // perform a disk operation
      // console.log(fileInfo);

      var targetImg = 'http://localhost:3000/host_Uploads/fullWidth/'+fileInfo.name;
      var dimension = {};

      im.identify(targetImg, function(err, output){
      if (err) throw err;
        // console.log('width: '+output.width);
        dimension.width = output.width;
        dimension.height = output.height;
        //TO DO: get fullWidth image size instead original size.
        // console.log("dimension: "+dimension.width+" / "+dimension.height);
      });

      fileInfo.dimension = dimension;

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