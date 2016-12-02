Meteor.publish('posts', function() {
  return Posts.find({
    $or: [
      {state: POST_STATE_CUR},
      {userId: this.userId}
    ]
  });
  // return Posts.find({});
});

Meteor.publish('settings', function() {
  return Settings.find({});
});

Meteor.publish('events', function() {
  return Events.find({});
});
