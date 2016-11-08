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

validatePost = function (post) {
  // console.log("validatePost()");
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  // if (!post.text)
  //   errors.text =  "Please fill in a text";
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
    errorMessage = "예약을 원하시는 좌석 수를 입력해 주세요. Please fill in seat number to reserve.";

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
