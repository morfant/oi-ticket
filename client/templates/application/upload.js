// imgBasePath = "";
// imgFiles = [];

var uniqueID = "";

var findEmptyImgHolder = function() {
  var emptyIdx = null;
  for (var i = 0; i < thumbNailImgFillArr.length; i++) {
    if (thumbNailImgFillArr[i] == false) {
      emptyIdx = i;
      thumbNailImgFillArr[i] = true;
      Session.set('thumbNailImgFillArrSes', thumbNailImgFillArr);
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
      // imgID: uniqueID 
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

            var imgBasePath = fileInfo.filepath;
            console.log(imgBasePath);

            var exp = fileInfo.name.split('.').reverse()[0];
            console.log(exp);

            var file = fileInfo.name;
            console.log(file);
            // var newName = uploadedImgNum + "_" + img_unique_id + "_" + file;
            var newName = img_unique_id + "_" + emptyIdx + "." + exp;
            console.log("newName");
            console.log(newName);
            // newName = newName.replace(/ /g, ""); //remove whitespace
            // console.log("newName replaced");
            // console.log(newName);

            Meteor.call('renameImg', imgBasePath + file, imgBasePath + newName, function(error, result) {
              // display the error to the user and abort
              if (error) {
                console.log("got error");
                return throwError(error.reason);
              } else {
                console.log("rename succeed");

                imgFiles[emptyIdx] = imgBasePath + newName; //defined post_submit.js
                console.log(imgFiles[0]);

              // If any empty holder exist, fill thumbnail img into it.
              // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
                var img = document.getElementById("t_img_" + emptyIdx);
                var p = document.getElementById("t_p_" + emptyIdx);
                // console.log(newName);
                console.log(UPLOAD_DIR + newName);
                img.src = UPLOAD_DIR + newName;

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