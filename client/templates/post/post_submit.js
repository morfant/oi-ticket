img_unique_id = "";
uploadedImgNum = 0;
var testValue = "test오이test";

Template.postSubmit.created = function() {
  Session.set('postSubmitErrors', {});

  img_unique_id = Random.id();
  // console.log("in postsubmit.created(): " + randomKey);
};


Template.postSubmit.rendered = function() {

};


Template.postSubmit.helpers({
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

  uploadedImgNum: function() {
    console.log(uploadedImgNum);
    return uploadedImgNum;
  },

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

      // imgId: randomKey
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
      
      Router.go('postPage', {_id: result._id});

    });


    // var path = fileInfo.filepath;
    // console.log(path);

    // var exp = fileInfo.name.split('.')[1];
    // console.log(exp);
    
    // var file = path + fileInfo.name;
    // console.log(file);
    // var newName = path + "jsjntest" + "." + exp;

    // Meteor.call('renameImg', file, newName, function(error, result) {
    //   // display the error to the user and abort
    //   if (error)
    //     return throwError(error.reason);

    //   console.log("rename succeed");

    // });


  }
});