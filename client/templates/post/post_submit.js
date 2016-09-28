var testValue = "test오이test";

var delImgOnPage = function(idx) {

  console.log(imgFiles[idx]);

  thumbNailImgFillArr[idx] = false;
  Session.set('thumbNailImgFillArrSes', thumbNailImgFillArr);
  
  // /host_Uploads/gSAk4kgg64Lffp6tZ_bg_test.png
  Meteor.call('deleteImg', imgFiles[idx], function(error, result) {

    // display the error to the user and abort
    if (error) {
      console.log("got error");
      return throwError(error.reason);
    } else {
      console.log("delete succeed");
    }

  });
};


var getImgNum = function() {
  var imgNum = 0;
  for (var i = 0; i < thumbNailImgFillArr.length; i++){
    if (thumbNailImgFillArr[i] == true) imgNum++;
  }
  return imgNum;
}


Template.postSubmit.created = function() {
  // imgBasePath = "";
  imgFiles = []; //Store img file name shoing on page

  img_unique_id = Random.id();
  img_num = 0;
  thumbNailImgFillArr = [false, false, false];

  Session.set('postSubmitErrors', {});
  // Session.set('uploadedImgNumSes', uploadedImgNum);
  Session.set('thumbNailImgFillArrSes', thumbNailImgFillArr);


  // console.log("in postsubmit.created(): " + randomKey);
};


Template.postSubmit.rendered = function() {

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
    // console.log("thumbNailImgFillArr[" + idx + "]: " + thumbNailImgFillArr[idx]);
    thumbNailImgFillArr = Session.get('thumbNailImgFillArrSes');
    return thumbNailImgFillArr[idx];
  },

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

    console.log("postInsert in client");
    // console.log($(e.target).find('#text').html());

    var nImg = getImgNum();
    
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
      imgId: img_unique_id,
      imgNum: nImg,

    };
    console.log(post.title);
    console.log(post.price);

    var errors = validatePost(post);
    // if (errors.title || errors.text)
    if (errors.title)      
      return Session.set('postSubmitErrors', errors);

    console.log("Before Meteor call");

    Meteor.call('postInsert', post, function(error, result) {
      console.log("Meteor call");
      // display the error to the user and abort
      if (error) {
        console.log("ERROR!!");
        console.log(error.reason);
        return throwError(error.reason);
      }
      
      Meteor.call('moveAllImg', function(error, result) {
        if (error) {
          console.log("ERROR - moveAllImg");
          return throwError(error);
        }

      });

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