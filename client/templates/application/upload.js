var uniqueID = "";

Template.uploadJquery.created = function(){
  // uniqueID = this.data.uniqueID;
  // console.log(uniqueID);


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

          uploadedImgNum++;
          if (uploadedImgNum <= UPLOAD_IMG_MAXIUM) {

            var path = fileInfo.filepath;
            console.log(path);

            var exp = fileInfo.name.split('.')[1];
            console.log(exp);

            var file = fileInfo.name;
            console.log(file);
            var newName = uploadedImgNum + "_" + img_unique_id + "_" + file;

            Meteor.call('renameImg', path + file, path + newName, function(error, result) {
              // display the error to the user and abort
              if (error) {
                console.log("got error");
                return throwError(error.reason);
              } else {
                console.log("rename succeed");

              // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
                var img = document.getElementById("t_img_" + uploadedImgNum);
                var p = document.getElementById("t_p_" + uploadedImgNum);
                console.log(newName);
                console.log('/host_Uploads/' + newName);
                img.src = '/host_Uploads/' + newName;
                // var nameSplited = newName.split('_');
                // console.log(nameSplited);
                p.innerHTML = newName;

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