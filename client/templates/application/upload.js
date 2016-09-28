imgBasePath = "";
imgFiles = [];

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
  // uniqueID = this.data.uniqueID;
  // console.log(uniqueID);


};

Template.uploadJquery.helpers({
  // findEmptyImgHolder: function() {
  //   var emptyIdx = null;
  //   for (var i = 0; i < thumbNailImgFillArr.length - 1; i++) {
  //     if (thumbNailImgFillArr[i] == false) {
  //       emptyIdx = i;
  //       thumbNailImgFillArr[i] = true;
  //       Session.set('thumbNailImgFillArrSes', thumbNailImgFillArr);
  //       console.log(emptyIdx);
  //       break;
  //     }
  //   };
  //   return emptyIdx;
  // },

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

            imgBasePath = fileInfo.filepath;
            console.log(imgBasePath);

            var exp = fileInfo.name.split('.')[1];
            console.log(exp);

            var file = fileInfo.name;
            console.log(file);
            // var newName = uploadedImgNum + "_" + img_unique_id + "_" + file;
            var newName = emptyIdx + "_OF_" + img_unique_id + "_" + file;
            newName = newName.replace(" ", ""); //remove whitespace

            Meteor.call('renameImg', imgBasePath + file, imgBasePath + newName, function(error, result) {
              // display the error to the user and abort
              if (error) {
                console.log("got error");
                return throwError(error.reason);
              } else {
                console.log("rename succeed");

                imgFiles[emptyIdx] = imgBasePath + newName;
                console.log(imgFiles[0]);

              // If any empty holder exist, fill thumbnail img into it.
              // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
                var img = document.getElementById("t_img_" + emptyIdx);
                var p = document.getElementById("t_p_" + emptyIdx);
                console.log(newName);
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