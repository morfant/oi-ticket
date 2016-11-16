var imgFiles_postEdit = [];
var imgHolders_postEdit = [];

var delImgOnPage = function(idx) {

  // get imgFiles from upload.js
  // imgFiles_postEdit = Session.get('imgFiles');
  console.log(imgFiles_postEdit[idx]);
  imgFiles_postEdit[idx] = false;
  console.log(imgFiles_postEdit);
  imgHolders_postEdit[idx] = false;
  console.log(imgHolders_postEdit);
  Session.set('imgHolders', imgHolders_postEdit);
  Session.set('imgFiles', imgFiles_postEdit);

  // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
  Meteor.call('deleteImg', UPLOAD_DIR + imgFiles_postEdit[idx], function(error, result) {

    // display the error to the user and abort
    if (error) {
      console.log("got error");
      return throwError(error.reason);
    } else {
      console.log("delete succeed");
    }

  });
};
//
// var delImgOnPage = function(idx) {
//
//   // console.log("idx: " + idx);
//   // console.log(imgFiles[idx]);
//
//   // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
//   var imgPath = '/Users/giy/oi-ticket/host_Uploads/';
//   Meteor.call('deleteImg', imgPath + imgFiles[idx], function(error, result) {
//
//     // display the error to the user and abort
//     if (error) {
//       console.log("got error");
//       return throwError(error.reason);
//     } else {
//       console.log("delete succeed");
//       imgFiles[idx] = false;
//       // imgFiles.splice(idx, 1); //remove deleted idx img
//       // console.log("imgFiles in delImgOnPage(): " + imgFiles);
//       Session.set('imgFiles', imgFiles);
//
//       console.log(Session.get('imgFiles'));
//     }
//
//   });
// };
//

Template.postEdit.created = function() {
  console.log("postEdit CREATED");
  thumbNailImgIdx = 0; //GLOBAL, using in thumbNailView.js
  Session.set('postEditErrors', {});
  var emptyArr = [false, false, false];
  Session.set('imgFiles', emptyArr);
  Session.set('imgHolders', emptyArr);

  // imgHolders = [];
  // imgFiles = Session.get('imgFilesEdit');
  // console.log("imgFiles in CREATED");
  // console.log(imgFiles);
  // for (i in imgFiles) {
  //   if (imgFiles[i] == false) {
  //     imgHolders[i] = false;
  //   } else {
  //     imgHolders[i] = true;
  //   }
  // }
  // Session.set('imgHoldersEdit', imgHolders);

}

Template.postEdit.rendered = function(){
  console.log("postEdit RENDERED");
  // imgFiles = Session.get('imgFilesEdit');
  console.log(imgFiles_postEdit);
  img_unique_id = null;
  console.log(imgFiles_postEdit.length);
  // var imgHolders = [];

  for (var i = 0; i < imgFiles_postEdit.length; i++) {
    if (imgFiles_postEdit[i] == false) {
      imgHolders_postEdit[i] = false;
      continue;
    }
    imgHolders_postEdit[i] = true;
    img_unique_id = imgFiles_postEdit[i].split('_')[0];
    console.log("got img_unique_id: " + img_unique_id);
    var imgId = 't_img_' + i;
    var pId = 't_p_' + i;
    var img = document.getElementById(imgId);
    if (img != null){
      img.src = UPLOAD_DIR + imgFiles_postEdit[i];
    } else {
      console.log("img is null");
    }

    var p = document.getElementById(pId);
    if (p != null) {
      p.innerHTML = imgFiles_postEdit[i];
    } else {
      console.log("p is null");
    }
  }
  console.log("rendered - imgHolders: " + imgHolders_postEdit);
  Session.set('imgHolders', imgHolders_postEdit);
  Session.set('imgFiles', imgFiles_postEdit);

  if (img_unique_id == null) {
    img_unique_id = Random.id();
    console.log("NEW img_unique_id: " + img_unique_id);
  }

};

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },
  getPostId: function(postId) {
    console.log("postId: " + postId);
    Session.set('postEdit_postId', postId);
  },
  getThumbNailImgArr: function(imgsArr) {
    console.log("getThumbNailImgArr()");
    //get img filename array from db
    imgFiles_postEdit = imgsArr;

    // Session.set('imgFilesEdit', imgsArr);
    // console.log(Session.get('imgFiles'));
    // imgFiles = Session.get('imgFilesEdit');
    console.log("getThumbNailImgArr() imgFiles:");
    console.log(imgFiles_postEdit);
    for (i in imgFiles_postEdit) {
      if (imgFiles_postEdit[i] == false) {
        imgHolders_postEdit[i] = false;
      } else {
        imgHolders_postEdit[i] = true;
      }
    }
    Session.set('imgHolders', imgHolders_postEdit);
    // console.log(Session.get('imgFiles'));
    // console.log(Session.get('imgHolders'));
  },
   getThumbNailImgFill: function(idx) {
     console.log("getThumbNailImgFill(" + idx + ")");
    // console.log("imgHolders[" + idx + "]: " + imgHolders[idx]);
    imgHolders_postEdit = Session.get('imgHolders');
    console.log(idx + " / " + imgHolders_postEdit[idx]);
    return imgHolders_postEdit[idx];
    // return Session.get('imgHolders')[idx];
  },
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log("postedit submit");

    var currentPostId = this._id;

    imgFiles_postEdit = Session.get('imgFiles');
    console.log("imgFiles_postEdit: " + imgFiles_postEdit);

    var postProperties = {

      title: $(e.target).find('[name=title]').val().replace(/[\r\n]/g, "<br />"),
      period: $(e.target).find('[name=period]').val().replace(/[\r\n]/g, "<br />"),
      place: $(e.target).find('[name=place]').val().replace(/[\r\n]/g, "<br />"),
      playDates: $(e.target).find('[name=playDates]').val().replace(/[\r\n]/g, "<br />"),
      playDatesDetail: $(e.target).find('[name=playDatesDetail]').val().replace(/[\r\n]/g, "<br />"),
      price: $(e.target).find('[name=ticketPrice]').val().replace(/[\r\n]/g, "<br />"),
      duration: $(e.target).find('[name=duration]').val().replace(/[\r\n]/g, "<br />"),
      contact: $(e.target).find('[name=contact]').val().replace(/[\r\n]/g, "<br />"),
      ageGrade: $(e.target).find('[name=ageGrade]').val().replace(/[\r\n]/g, "<br />"),
      sponsor: $(e.target).find('[name=sponsor]').val().replace(/[\r\n]/g, "<br />"),
      production: $(e.target).find('[name=production]').val().replace(/[\r\n]/g, "<br />"),
      director: $(e.target).find('[name=director]').val().replace(/[\r\n]/g, "<br />"),
      original: $(e.target).find('[name=original]').val().replace(/[\r\n]/g, "<br />"),
      cast: $(e.target).find('[name=cast]').val().replace(/[\r\n]/g, "<br />"),
      arrange: $(e.target).find('[name=arrange]').val().replace(/[\r\n]/g, "<br />"),
      description: $(e.target).find('[name=description]').val().replace(/[\r\n]/g, "<br />"),
      synopsis: $(e.target).find('[name=synopsis]').val().replace(/[\r\n]/g, "<br />"),
      staffs: $(e.target).find('[name=staffs]').val().replace(/[\r\n]/g, "<br />"),
      includeImages: imgFiles_postEdit, //Array of filenames
      state: POST_STATE_TEMP
    }

    console.log(postProperties);

    var errors = validatePost(postProperties);
    if (errors.title || errors.text)
      return Session.set('postEditErrors', errors);

    Meteor.call('postUpdate', currentPostId, postProperties, function(error, result) {
      console.log("Meteor call - postUpdate()");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      console.log(result);

      /* move Imgs in submitting -> upload */
      Meteor.call('moveAllImg', function(error, result) {
        console.log("Meteor call - moveAllImg()");
        if (error) {
          console.log("ERROR - moveAllImg");
          return throwError(error);
        }
        console.log("moveAllImg succeed");
        Router.go('postPage', {_id: currentPostId});
    });
  });



    // Posts.update(currentPostId, {$set: postProperties}, function(error) {
    //   if (error) {
    //     // display the error to the user
    //     // alert(error.reason);
    //     throwError(error.reason);
    //
    //   } else {
    //     Router.go('postPage', {_id: currentPostId});
    //   }
    // });

  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      console.log(currentPostId);

      Meteor.call('postRemove', currentPostId, function(error, result) {
        console.log("Meteor call - postRemove()");
        // display the error to the user and abort
        if (error) {
          console.log("ERROR!!");
          console.log(error.reason);
          return throwError(error.reason);
        }

        console.log(result);
        Router.go('postsList');
      });
    }
  },

  'click .deleteImg': function(e) {
    e.preventDefault();

    var targetId = $(e.target).parent().attr('id');
    // console.log(target);

    if (targetId == 'del_0') {
      delImgOnPage(0);
    } else if (targetId == 'del_1') {
      delImgOnPage(1);
    } else if (targetId == 'del_2') {
      delImgOnPage(2);
    } else {

    }


  }

});
