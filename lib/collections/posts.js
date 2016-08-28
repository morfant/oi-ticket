Posts = new Mongo.Collection('posts');

Posts.allow({
  // update: ownsDocument,
  // remove: ownsDocument
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.text;
  }
});

validatePost = function (post) {
  console.log("validatePost()");
  var errors = {};
  if (!post.title)
    errors.title = "Please fill in a title";
  // if (!post.text)
  //   errors.text =  "Please fill in a text";
  return errors;
}


Meteor.methods({

  postInsert: function(postAttributes) {
    console.log(postAttributes);
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      notice: String,
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


    console.log("post in server: " + post);
    var postId = Posts.insert(post);


    return {
      _id: postId
    };
    
  },
  updatePostStatus: function(postId, whatBtn, val){
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login");
    var post = Posts.findOne(postId);
    if (!post)
      throw new Meteor.Error(422, 'Post not found');

    if (whatBtn == "onNow") {
      console.log(Posts.update({}, {$set: {isOnNow: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: val, isUpNext: false, isLastEp: false}});
    } else if (whatBtn == "upNext") {
      console.log(Posts.update({}, {$set: {isUpNext: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: false, isUpNext: val, isLastEp: false}});
    } else if (whatBtn == "lastEp") {
      // console.log(Posts.update({}, {$set: {isLastEp: false}}, {multi: true}));
      return Posts.update(post._id, {$set: {isOnNow: false, isUpNext: false, isLastEp: val}});
    } else {
      console.log("undefined button - nothing updated");
      return false
    }

  },
  // getCampaign: function () {
  //   if (Meteor.isServer) {
  //     this.unblock();
  //     var response = Meteor.wrapAsync(getCampaign_ApiCall)();
  //     return response;
  //   }
  // }


});