var imgFiles = [];

var delImgOnPage = function(idx) {

  // console.log("idx: " + idx);
  // console.log(imgFiles[idx]);

  // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
  var imgPath = '/Users/giy/oi-ticket/host_Uploads/';
  Meteor.call('deleteImg', imgPath + imgFiles[idx], function(error, result) {

    // display the error to the user and abort
    if (error) {
      console.log("got error");
      return throwError(error.reason);
    } else {
      console.log("delete succeed");
      imgFiles[idx] = false;
      // imgFiles.splice(idx, 1); //remove deleted idx img
      // console.log("imgFiles in delImgOnPage(): " + imgFiles);
      Session.set('imgFiles', imgFiles);

      console.log(Session.get('imgFiles'));
    }

  });
};


Template.postEdit.created = function() {
  thumbNailImgIdx = 0; //GLOBAL, using in thumbNailView.js
  Session.set('postEditErrors', {});
}

Template.postEdit.rendered = function(){
  console.log("imgFiles.length");
  var imgs = Session.get('imgFiles');
  console.log(imgs.length);

  for (var i = 0; i < imgs.length; i++) {
    if (imgs[i] == false){
      continue;
    }
    // if (imgs[i] != false) {
      var imgId = 't_img_' + i;
      var pId = 't_p_' + i;
      var img = document.getElementById(imgId);
      img.src = UPLOAD_DIR + imgs[i];

      var p = document.getElementById(pId);
      p.innerHTML = imgs[i];
    // }
  }

};

Template.postEdit.helpers({
  errorMessage: function(field) {
    return Session.get('postEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
  },
  getThumbNailImgArr: function(imgsArr) {
    //get img filename array from db
    imgFiles = imgsArr;
    Session.set('imgFiles', imgFiles);
    // console.log(Session.get('imgFiles'));
  },
  reactiveThumbNailImg: function() {
    console.log(Session.get('imgFiles'));
    return Session.get('imgFiles');
  }

});

Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var imgs = Session.get('imgFiles');
    console.log(imgs);
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
      includeImages: imgs, //Array of filenames
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
      Router.go('postPage', {_id: currentPostId});
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

      Posts.remove(currentPostId);
      Router.go('postsList');
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
