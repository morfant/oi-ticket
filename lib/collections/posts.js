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

validatePhoneNumber = function (number) {
  var re = new RegExp("\\D")
  var errors = {};
  if (re.test(number))
    errors.reserve_mobilePhone = "Only Number is allowed.";
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

});