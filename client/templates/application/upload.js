imgAbsPath = ""; //GLOBAL use at post_submit.js, post_edit.js
var imgFiles_upload = [];
var imgHolders_upload = [];

var findEmptyImgHolder = function() {
  var emptyIdx = null;
  var imgHolders_upload = Session.get('imgHolders');
  for (var i = 0; i < imgHolders_upload.length; i++) {
    if (imgHolders_upload[i] == false) {
      emptyIdx = i;
      imgHolders_upload[i] = true;
      Session.set('imgHolders', imgHolders_upload);
      console.log(emptyIdx);
      break;
    }
  };
  return emptyIdx;
};

Template.uploadJquery.created = function(){


};

Template.uploadJquery.helpers({
  specificFormData: function() {
    return {
      id: this._id,
      other: this.other,
      hard: 'Lolcats'
    }
  },
  myCallbacks: function() {
    return {
        // formData: function() { return { id: "232323", other: Session.get("ReactiveParam") } },
        finished: function(index, fileInfo, context) {
          // console.log(index);
          // console.log(fileInfo);
          // console.log(context);

          // uploadedImgNum++;
          // Session.set('uploadedImgNumSes', uploadedImgNum);

          // Find empty thumbnail img holder idx
          var emptyIdx = findEmptyImgHolder();
          // console.log(emptyIdx);

          // if (uploadedImgNum <= UPLOAD_IMG_MAXIUM) {
          if (emptyIdx != null) {

            imgFiles_upload = Session.get('imgFiles');
            console.log("imgFiles");
            console.log(imgFiles_upload);
            imgAbsPath = fileInfo.filepath;
            /* ex) /Users/giy/oi-ticket/host_Uploads/ */
            // console.log("imgAbsPath: " + imgAbsPath);

            var exp = fileInfo.name.split('.').reverse()[0];
            /* ex) png */
            // console.log("ext: " + exp);

            var file = fileInfo.name;
            /* ex) grass.png */
            // console.log("filename: " + file);

            // var newName = uploadedImgNum + "_" + img_unique_id + "_" + file;

            var img_unique_id = Session.get('img_unique_id');
            var newName = img_unique_id + "_" + emptyIdx + "." + exp;
            // console.log("newName: " + newName);
            // newName = newName.replace(/ /g, ""); //remove whitespace
            // console.log("newName replaced");
            // console.log(newName);

            Meteor.call('renameImg', imgAbsPath + file, imgAbsPath + newName, function(error, result) {
              // display the error to the user and abort
              if (error) {
                console.log("got error");
                return throwError(error.reason);
              } else {
                console.log("rename succeed");

                // imgFiles[emptyIdx] = imgAbsPath + newName; //defined post_submit.js
                imgFiles_upload[emptyIdx] = newName; //defined post_submit.js
                Session.set('imgFiles', imgFiles_upload);
                console.log("imgFiles - UPLOADED: " + imgFiles_upload);
                // console.log(imgFiles[0]);

              // If any empty holder exist, fill thumbnail img into it.
              // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
                var img = document.getElementById("t_img_" + emptyIdx);
                var p = document.getElementById("t_p_" + emptyIdx);

                console.log(UPLOAD_DIR_SUBMIT + newName);
                img.src = UPLOAD_DIR_SUBMIT + newName;

                // var nameSplited = newName.split('_');
                // console.log(nameSplited);
                p.innerHTML = emptyIdx + "_" + file;
                //TODO : add delete button

              }

            });

          } else {
            console.log("3 images upload per a post is maximum!!");
          }

        },
    }
  }
});
