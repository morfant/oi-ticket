var testValue = "test오이test";
var imgFiles_postSubmit = []; //fill with image filenames
var imgHolders_postSubmit = []; //fill with image filenames

var delImgOnPage = function(idx) {

  imgFiles_postSubmit = Session.get('imgFiles');
  console.log(imgFiles_postSubmit[idx]);

  imgHolders_postSubmit[idx] = false;
  Session.set('imgHolders', imgHolders_postSubmit);

  // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
  Meteor.call('deleteImg', imgAbsPath + imgFiles_postSubmit[idx], function(error, result) {

    // display the error to the user and abort
    if (error) {
      console.log("got error");
      return throwError(error.reason);
    } else {
      console.log("delete succeed");
    }

  });
};


// var getImgNum = function() {
//   var imgNum = 0;
//   for (var i = 0; i < imgHolders.length; i++){
//     if (imgHolders[i] == true) imgNum++;
//   }
//   console.log(imgNum);
//   return imgNum;
// }
//

Template.postSubmit.created = function() {
  thumbNailImgIdx = 0;

  // Session.set('imgFiles', {});
  // imgFiles = []; //GLOBAL, Store img filename showing on page

  img_unique_id = Random.id(); // Used for events of a post also. (addEditEventModal.js)
  img_num = 0;
  // imgFiles_postSubmit = [false, false, false];
  // imgHolders_postSubmit = [false, false, false];
  var emptyArr = [false, false, false];
  Session.set('imgFiles', emptyArr);
  Session.set('imgHolders', emptyArr);

  Session.set('postSubmitErrors', {});
  // Session.set('uploadedImgNumSes', uploadedImgNum);
  // Session.set('imgHolders', imgHolders_postSubmit);

  // console.log("in postsubmit.created(): " + randomKey);


  /* Clear useless events */
  Meteor.call('clearEvents', function(error, result) {
      console.log("Meteor call - clearEvents()");

      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      console.log("clearEvents succeed.");

    })

};


Template.postSubmit.rendered = function() {

  console.log("imgFiles - PAGE RENDERED: " + imgFiles_postSubmit);

  // TODO : delete all (.jp(e)g, .png, .gif) files
  Meteor.call('deleteAllImg', function(error, result) {
      console.log("Meteor call");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      console.log("Delete all imgs");

    })

};


Template.postSubmit.helpers({
  getThumbNailImgFill: function(idx) {
    // console.log("imgHolders[" + idx + "]: " + imgHolders[idx]);
    imgHolders_postSubmit = Session.get('imgHolders');
    return imgHolders_postSubmit[idx];
  },
  // getThumbNailImgArr: function(imgsArr) {
  //   //get img filename array from db
  //   imgFiles = imgsArr;
  //   Session.set('imgFiles', imgFiles);
  //   // console.log(Session.get('imgFiles'));
  // },
  // reactiveThumbNailImg: function() {
  //   console.log(Session.get('imgFiles'));
  //   return Session.get('imgFiles');
  // }

  equals: function(a, b) {
    console.log(a);
    console.log(b);
    console.log("compare equal");
    if (a == b){
      console.log("true")
      return true;
    } else {
      console.log("false");
      return false;
    }
  },

  gt: function(a, b) {
    if (a >= b){
      console.log("true")
      return true;
    } else {
      console.log("false");
      return false;
    }
  },

  // uploadedImgNum: function() {
  //   console.log(uploadedImgNum);
  //   // return uploadedImgNum;
  //   return Session.get('uploadedImgNumSes');
  // },

  testValue: function() {
    return testValue;
  },

  imgUniqId: function() {
    console.log("in postSubmit helpers randomKey(): " + img_unique_id);
    return {uniqueID: img_unique_id};
  },

  errorMessage: function(field) {
    return Session.get('postSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  }
});

// $.valHooks.textarea = {
//   get: function( elem ) {
//     return elem.value.replace( /\r?\n/g, "\r\n" );
//   }
// };

Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    console.log("postsubmit submit");
    // console.log($(e.target).find('#text').html());
    imgFiles_postSubmit = Session.get('imgFiles');
    console.log("imgFiles_postSubmit: " + imgFiles_postSubmit);

    var post = {
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
      includeImages: imgFiles_postSubmit, //filenames
      state: POST_STATE_TEMP,
      // imgId: img_unique_id,
      // imgNum: nImg,


    };

    var errors = validatePost(post);
    // if (errors.title || errors.text)
    if (errors.title)
      return Session.set('postSubmitErrors', errors);


    var errors = validateEvent();
    if (errors.event)
      return Session.set('postSubmitErrors', errors);


    // console.log("Before Meteor call");

    /* 1. post insert */
    Meteor.call('postInsert', post, function(error, result) {
      console.log("Meteor call - postInsert()");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }

      console.log("result._id: " + result._id);

      /* 2. fix events to post._id */
      var update = {
        post_ID: result._id,
      };

      Meteor.call( 'fixEventToPost', update, ( error ) => {
        if ( error ) {
          console.log("ERROR - fixEventToPost");
          // bert.alert( error.reason, 'danger' );
          return throwError(error);
        }

        /* 3. move Imgs */
        Meteor.call('moveAllImg', function(error, result) {
          if (error) {
            console.log("ERROR - moveAllImg");
            return throwError(error);
          }

        });


      });


      // clear imgFiles array
      // imgFiles = [];
      // console.log("clear imgFiles");
      // console.log(imgFiles);

      console.log("inserted post id: " + result._id);
      Router.go('postPage', {_id: result._id});

    });


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
