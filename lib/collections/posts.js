Posts = new Mongo.Collection('posts');

Posts.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.text;
  }
});


/*

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
    };

*/
validatePost = function (post) {
  // console.log("validatePost()");
  var errors = {};
  // if (!post.title) errors.title = "필수 입력 사항입니다. Please fill in this form.";
  if (!post.title) errors.title = "제목을 입력해 주세요. Please fill in a title.";
  if (!post.period) errors.period = "공연기간을 입력해 주세요. Please fill in a period.";
  if (!post.place) errors.place = "장소를 입력해 주세요. Please fill in a place.";
  if (!post.playDates) errors.playDates = "공연시간을 입력해 주세요. Please fill in a playDates.";
  if (!post.price) errors.price = "티켓가격 정보를 입력해 주세요. Please fill in a price.";
  if (!post.duration) errors.duration = "소요시간을 입력해 주세요. Please fill in a duration.";
  if (!post.contact) errors.contact = "공연문의 연락처를 입력해 주세요. Please fill in a contact.";
  if (!post.description) errors.description = "작품 소개를 입력해 주세요. Please fill in a description.";
  return errors;
}

validateNameKeyUp = function (name) {
  var errorMessage = "";

  if (!name)
    errorMessage = "이름을 입력해 주세요. Please fill in a name.";

  return errorMessage;
}

validatePhoneNumberKeyUp = function (number) {
  var errorMessage = "";
  var re = new RegExp("\\D")

  if (number.length > 11)
    errorMessage = "너무 긴 번호입니다. Too long to be a phone number.";
  else if (number.length < 9 && number.length > 0)
    errorMessage = "너무 짧은 번호입니다. Too short to be a phone number.";
  else if (!number)
    errorMessage = "휴대폰번호를 입력해 주세요. Please fill in a moblile number.";

  if (re.test(number))
    errorMessage = "숫자만 입력 가능합니다. Only Number is allowed.";

  return errorMessage;
}

validateSeatsKeyUp = function (seats, availableSeats) {
  var errorMessage = "";
  var re = new RegExp("\\D")

  if (re.test(seats))
    errorMessage = "숫자만 입력 가능합니다. Only Number is allowed.";

  if (Number(seats) > availableSeats)
    errorMessage = "잔여좌석이 " + availableSeats + "석 남았습니다. There are only " + availableSeats + " seats left.";

  if (Number(seats) > SEAT_LIMIT_PER_PERSON)
    errorMessage = "1인당 예약 가능 좌석은 5석 입니다. Only 5 seats is allowed to reserve per person.";

  if (!seats)
    errorMessage = "예약을 원하시는 좌석 수를 입력해 주세요. Please fill in a seat number to reserve.";

  return errorMessage;
}

validateReservInfo = function (info) {
  console.log("validateReservInfo()");
  var errors = {};

  if (!info.name)
    errors.reserve_name = "이름을 입력해 주세요. Please fill in a name.";

  if (!info.phone)
    errors.reserve_mobilePhone = "휴대폰번호를 입력해 주세요. Please fill in a moblile number.";

  if (!info.seats)
    errors.reserve_seats = "예약을 원하시는 좌석 수를 입력해 주세요. Please fill in seat number to reserve.";

  return errors;
}


Meteor.methods({

  postInsert: function(postAttributes) {
    // console.log(postAttributes);

    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      period: String,
      place: String,
      playDates: String,
      playDatesDetail: String,
      price: String,
      duration: String,
      contact: String,
      ageGrade: String,
      sponsor: String,
      production: String,
      director: String,
      original: String,
      cast: String,
      arrange: String,
      description: String,
      synopsis: String,
      staffs: String,
      // imgId: String,
      // imgNum: Number
      includeImages: Array,
      state: Number,

      // TODO: check all element

    });

    var errors = validatePost(postAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and text for your post");

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });


    // console.log("post in server: " + post);
    var postId = Posts.insert(post);


    return {
      _id: postId
    };

  },
  postUpdate: function(post_id, postAttributes) {

    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      period: String,
      place: String,
      playDates: String,
      playDatesDetail: String,
      price: String,
      duration: String,
      contact: String,
      ageGrade: String,
      sponsor: String,
      production: String,
      director: String,
      original: String,
      cast: String,
      arrange: String,
      description: String,
      synopsis: String,
      staffs: String,
      includeImages: Array,
      state: Number,

      // TODO: check all element

    });

    var errors = validatePost(postAttributes);
    if (errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and text for your post");

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });


    // console.log("post in server: " + post);
    var numOfMatchedDoc = Posts.update(post_id, {$set: postAttributes});

    if (!numOfMatchedDoc)
      throw new Meteor.Error(500, "No matched post!");

    return {
      result: numOfMatchedDoc
    };

  },
  postRemove: function(postId) {
    // remove events
    var removeEvents = Events.remove({post_ID:postId})
    if (!removeEvents) console.log("No events to delete!");

    // remove post itself
    var removeResult = Posts.remove(postId);
    if (!removeResult)
      throw new Meteor.Error(500, "No post remove result!");

    return {
      result: removeResult
    };

  },

  updatePostState: function(postId, newState){
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');

    // console.log("newState in server(): " + newState);
    if (newState > POST_STATE_CUR || newState < POST_STATE_FIN) {
      throw new Meteor.Error(500, 'post state only has number(0 ~ 2)');
    }

    return Posts.update(post._id, {$set: {state: newState}});

  },
  getTitle: function(postId){

    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');

    return post.title;

  },

});
