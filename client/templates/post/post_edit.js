var imgFiles_postEdit = [];
var imgHolders_postEdit = [];
var includeImagesIsEmpty = false;
var img_unique_id_postEdit = null;

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
  // Meteor.call('deleteImg', UPLOAD_DIR + imgFiles_postEdit[idx], function(error, result) {
  Meteor.call('deleteImg', imgAbsPath + imgFiles_postEdit[idx], function(error, result) {

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
}

Template.postEdit.rendered = function(){
  console.log("postEdit RENDERED");
  console.log(imgFiles_postEdit);

  for (var i = 0; i < imgFiles_postEdit.length; i++) {
    if (imgFiles_postEdit[i] == false) {
      imgHolders_postEdit[i] = false;
      continue;
    }
    imgHolders_postEdit[i] = true;
    img_unique_id_postEdit = imgFiles_postEdit[i].split('_')[0];
    console.log("got img_unique_id: " + img_unique_id_postEdit);

    // Show stored images(Not uploaded)
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

  if (img_unique_id_postEdit == null) {
    includeImagesIsEmpty = true;
    img_unique_id_postEdit = Random.id();
    console.log("NEW img_unique_id: " + img_unique_id_postEdit);
  }

  // Share img_unique_id with Session
  Session.set('img_unique_id', img_unique_id_postEdit);

};

Template.postEdit.helpers({
  needToLoading: function() {
    console.log("needToLoading: " + Session.get('needToLoading'));
    return Session.get('needToLoading');
  },
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
  // Get 'includeImages' from db.
  getThumbNailImgArr: function(imgsArr) {
    console.log("getThumbNailImgArr()");
    //get img filename array from db
    imgFiles_postEdit = imgsArr;

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
  },
   getThumbNailImgFill: function(idx) {
    imgHolders_postEdit = Session.get('imgHolders');
    console.log(idx + " / " + imgHolders_postEdit[idx]);
    return imgHolders_postEdit[idx];
  },
});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log("POSTEDIT submit");

    var currentPostId = this._id;

    imgFiles_postEdit = Session.get('imgFiles');
    console.log("imgFiles_postEdit: " + imgFiles_postEdit);

    var prevState = this.state;

    var postProperties = {
      title: $(e.target).find('[name=title]').val().replace(/[\r\n]/g, "<br />"),
      period: $(e.target).find('[name=period]').val().replace(/[\r\n]/g, "<br />"),
      place: $(e.target).find('[name=place]').val().replace(/[\r\n]/g, "<br />"),
      playDates: $(e.target).find('[name=playDates]').val().replace(/[\r\n]/g, "<br />"),
      playDatesDetail: $(e.target).find('[name=playDatesDetail]').val().replace(/[\r\n]/g, "<br />"),
      ticketPrice: $(e.target).find('[name=ticketPrice]').val().replace(/[\r\n]/g, "<br />"),
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
      state: prevState
    }
    // console.log(postProperties);
    var errors = validatePost(postProperties);
    if
    ( errors.title || errors.period || errors.place || errors.playDates ||
      errors.ticketPrice || errors.duration || errors.contact || errors.description)
      return Session.set('postEditErrors', errors);

    var errors = validateEvent();
    if (errors.event)
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
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {

      var currentPostId = this._id;
      console.log(currentPostId);

      console.log("includeImagesIsEmpty: " + includeImagesIsEmpty);
      // delete includeImages
      // Nothing in UPLOAD_DIR_SUBMIT but only UPLOAD_DIR
      Session.set('needToLoading', true);
      if (!includeImagesIsEmpty){
        Meteor.call('deleteAllImg_uploaded', img_unique_id_postEdit, function(error, result) {
          console.log("Meteor call - deleteAllImg_uploaded()");
          // display the error to the user and abort
          if (error) {
            console.log("ERROR!!");
            console.log(error.reason);
            return throwError(error.reason);
          }
          // console.log(result);

          // delete event + delete post itself
          Meteor.call('postRemove', currentPostId, function(error, result) {
            console.log("Meteor call - postRemove()");
            // display the error to the user and abort
            if (error) {
              console.log("ERROR!!");
              console.log(error.reason);
              return throwError(error.reason);
            }
            Session.set('needToLoading', false);
            console.log(result);
            Router.go('postsList');
          });
        });
      } else {
        // delete event + delete post itself
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
    }
  },

  'click .deleteImg': function(e) {
    e.preventDefault();

    var targetId = $(e.target).parent().attr('id');

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
