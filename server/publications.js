Meteor.publish('posts', function() {
  return Posts.find();
});

// Meteor.publish('streamUrl', function() {
//   return StreamURL.find();
// });

// Meteor.publish('bgImgUrl', function() {
//   return BackgroundImageURL.find();
// });

Meteor.publish('events', function() {
  return Events.find();
});