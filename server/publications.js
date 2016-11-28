Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('settings', function() {
  return Settings.find();
});

Meteor.publish('events', function() {
  return Events.find();
});
